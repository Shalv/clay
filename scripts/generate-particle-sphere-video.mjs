import { spawn } from 'child_process';
import path from 'path';

const WIDTH = 960;
const HEIGHT = 960;
const FPS = 30;
const DURATION = 5; // 5 seconds loop, matching the uploaded video length
const TOTAL_FRAMES = FPS * DURATION; // 150 frames
const NUM_PARTICLES = 3600;

// Golden angle Fibonacci distribution on sphere surface + subtle volume jitter
const particles = [];
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

for (let i = 0; i < NUM_PARTICLES; i++) {
  const y = 1 - (i / (NUM_PARTICLES - 1)) * 2; // y goes from 1 to -1
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = GOLDEN_ANGLE * i;
  
  // Slight radial thickness jitter for realistic 3D volumetric starlight look
  const rJitter = 1.0 + (Math.sin(i * 997.3) * 0.04);
  const x = Math.cos(theta) * radiusAtY * rJitter;
  const z = Math.sin(theta) * radiusAtY * rJitter;
  
  // Particle base brightness and size
  const sizeRand = (Math.sin(i * 43.7) + 1) * 0.5;
  const radiusPx = 0.7 + sizeRand * 1.3; // 0.7px to 2.0px
  const baseAlpha = 0.5 + sizeRand * 0.5;

  particles.push({ x, y: y * rJitter, z, radiusPx, baseAlpha });
}

// Axis tilt: ~12 degrees on X-axis, ~6 degrees on Z-axis for that natural 3D angle
const TILT_X = 14 * (Math.PI / 180);
const cosTiltX = Math.cos(TILT_X);
const sinTiltX = Math.sin(TILT_X);

const TILT_Z = 6 * (Math.PI / 180);
const cosTiltZ = Math.cos(TILT_Z);
const sinTiltZ = Math.sin(TILT_Z);

const SPHERE_RADIUS = WIDTH * 0.38; // Radius of sphere in pixels
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const FOV_DISTANCE = 3.5; // Camera perspective distance

const ffmpegArgs = [
  '-y',
  '-f', 'rawvideo',
  '-vcodec', 'rawvideo',
  '-s', `${WIDTH}x${HEIGHT}`,
  '-pix_fmt', 'rgba',
  '-r', `${FPS}`,
  '-i', '-',
  '-c:v', 'libx264',
  '-profile:v', 'high',
  '-level', '4.0',
  '-pix_fmt', 'yuv420p',
  '-crf', '18',
  '-preset', 'fast',
  '-movflags', '+faststart',
  path.resolve('./public/hero-particle-sphere.mp4')
];

console.log('Starting ffmpeg process...');
const ffmpeg = spawn('ffmpeg', ffmpegArgs);

ffmpeg.stderr.on('data', (d) => {
  // Silent or log progress
});

ffmpeg.on('close', (code) => {
  console.log(`ffmpeg exited with code ${code}`);
  if (code === 0) {
    console.log('Video generated successfully: public/hero-particle-sphere.mp4');
  }
});

const frameBuffer = Buffer.alloc(WIDTH * HEIGHT * 4);

for (let f = 0; f < TOTAL_FRAMES; f++) {
  // Clear buffer to pure black (RGBA 0,0,0,255)
  frameBuffer.fill(0);
  for (let idx = 3; idx < frameBuffer.length; idx += 4) {
    frameBuffer[idx] = 255;
  }

  // Current rotation angle for perfect seamless 360-degree loop
  const rotY = (f / TOTAL_FRAMES) * Math.PI * 2;
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);

  // Rotate and project all particles
  const projected = [];

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = particles[i];
    
    // Rotate around Y-axis
    let rx = p.x * cosY + p.z * sinY;
    let ry = p.y;
    let rz = -p.x * sinY + p.z * cosY;

    // Apply tilt X
    let tx_y = ry * cosTiltX - rz * sinTiltX;
    let tx_z = ry * sinTiltX + rz * cosTiltX;
    ry = tx_y;
    rz = tx_z;

    // Apply tilt Z
    let tz_x = rx * cosTiltZ - ry * sinTiltZ;
    let tz_y = rx * sinTiltZ + ry * cosTiltZ;
    rx = tz_x;
    ry = tz_y;

    // Perspective projection
    const zDepth = rz;
    const factor = FOV_DISTANCE / (FOV_DISTANCE + zDepth);
    const screenX = CX + rx * SPHERE_RADIUS * factor;
    const screenY = CY + ry * SPHERE_RADIUS * factor;

    // Depth cue: particles at front (zDepth > 0) are larger and brighter
    // zDepth ranges from -1 to 1
    const normalizedDepth = (zDepth + 1) / 2; // 0 to 1
    const brightness = Math.max(0.12, Math.min(1.0, 0.2 + normalizedDepth * 0.8 * p.baseAlpha));
    const pointRadius = p.radiusPx * (0.65 + normalizedDepth * 0.65);

    projected.push({
      x: screenX,
      y: screenY,
      z: zDepth,
      radius: pointRadius,
      brightness
    });
  }

  // Painter's algorithm: draw from back to front
  projected.sort((a, b) => a.z - b.z);

  for (const pt of projected) {
    const rInt = Math.ceil(pt.radius);
    const px = Math.round(pt.x);
    const py = Math.round(pt.y);

    const colorVal = Math.round(pt.brightness * 255);

    for (let dy = -rInt; dy <= rInt; dy++) {
      const iy = py + dy;
      if (iy < 0 || iy >= HEIGHT) continue;

      for (let dx = -rInt; dx <= rInt; dx++) {
        const ix = px + dx;
        if (ix < 0 || ix >= WIDTH) continue;

        const distSq = dx * dx + dy * dy;
        const radSq = pt.radius * pt.radius;
        if (distSq <= radSq + 0.5) {
          // Soft edge falloff
          const falloff = Math.max(0, 1 - Math.sqrt(distSq) / (pt.radius + 0.4));
          const addVal = Math.round(colorVal * falloff);

          const offset = (iy * WIDTH + ix) * 4;
          // Additive blending for starry glow
          frameBuffer[offset] = Math.min(255, frameBuffer[offset] + addVal);
          frameBuffer[offset + 1] = Math.min(255, frameBuffer[offset + 1] + Math.round(addVal * 0.98));
          frameBuffer[offset + 2] = Math.min(255, frameBuffer[offset + 2] + Math.round(addVal * 1.05)); // slight cool white tint
        }
      }
    }
  }

  // Write frame to ffmpeg stdin
  ffmpeg.stdin.write(frameBuffer);
}

ffmpeg.stdin.end();
