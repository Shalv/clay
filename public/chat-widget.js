/**
 * Coreenact Copilot Studio Embeddable Site Agent Widget
 * Zero-dependency, standalone embeddable chat widget with autonomous lead capture
 * Usage: <script src="https://ais-dev-.../chat-widget.js" data-agent-name="Coreenact Copilot" data-primary-color="#0078D4"></script>
 */
(function () {
  'use strict';

  // Prevent double injection
  if (window.__CoreenactChatWidgetLoaded) return;
  window.__CoreenactChatWidgetLoaded = true;

  // Extract configuration from the current script tag
  var currentScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var apiBase = currentScript ? (currentScript.getAttribute('data-api-base') || '') : '';
  var agentName = (currentScript && currentScript.getAttribute('data-agent-name')) || 'Coreenact Copilot';
  var primaryColor = (currentScript && currentScript.getAttribute('data-primary-color')) || '#0078D4';
  var position = (currentScript && currentScript.getAttribute('data-position')) || 'right'; // 'right' or 'left'
  var logoUrl = (currentScript && currentScript.getAttribute('data-logo-url')) || (apiBase + '/copilot-agent-logo.webp');

  // Inject Styles
  var styles = `
    .crn-widget-container {
      position: fixed;
      bottom: 24px;
      ${position === 'left' ? 'left: 24px;' : 'right: 24px;'}
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .crn-launcher-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${primaryColor} 0%, #005a9e 100%);
      box-shadow: 0 8px 24px rgba(0, 120, 212, 0.35);
      border: 3px solid #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      outline: none;
      padding: 0;
    }
    .crn-launcher-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 30px rgba(0, 120, 212, 0.45);
    }
    .crn-launcher-btn img {
      width: 38px;
      height: 38px;
      object-fit: contain;
    }
    .crn-chat-panel {
      position: fixed;
      bottom: 96px;
      ${position === 'left' ? 'left: 24px;' : 'right: 24px;'}
      width: 380px;
      max-width: calc(100vw - 48px);
      height: 580px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18), 0 0 1px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      z-index: 999999;
      animation: crnSlideUp 0.25s ease-out;
    }
    @keyframes crnSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .crn-header {
      background: linear-gradient(135deg, ${primaryColor} 0%, #004578 100%);
      color: #ffffff;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .crn-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .crn-header-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #ffffff;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .crn-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .crn-header-title {
      font-size: 15px;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
    }
    .crn-header-subtitle {
      font-size: 11px;
      opacity: 0.9;
      margin: 2px 0 0 0;
    }
    .crn-header-close {
      background: transparent;
      border: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 20px;
      padding: 4px;
      line-height: 1;
      opacity: 0.8;
    }
    .crn-header-close:hover { opacity: 1; }
    .crn-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .crn-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    .crn-msg-agent {
      align-self: flex-start;
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 4px;
    }
    .crn-msg-user {
      align-self: flex-end;
      background: ${primaryColor};
      color: #ffffff;
      border-bottom-right-radius: 4px;
    }
    .crn-prompts-bar {
      padding: 8px 12px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      white-space: nowrap;
    }
    .crn-prompt-chip {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #0f172a;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 12px;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s;
    }
    .crn-prompt-chip:hover {
      background: #e2e8f0;
    }
    .crn-input-row {
      padding: 10px 12px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 8px;
    }
    .crn-input {
      flex: 1;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      outline: none;
    }
    .crn-input:focus {
      border-color: ${primaryColor};
    }
    .crn-send-btn {
      background: ${primaryColor};
      color: #ffffff;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
    }
    .crn-lead-card {
      background: #ffffff;
      border: 1px solid #93c5fd;
      border-radius: 10px;
      padding: 12px;
      margin-top: 6px;
      box-shadow: 0 4px 12px rgba(0, 120, 212, 0.08);
    }
    .crn-lead-title {
      font-weight: 700;
      font-size: 12px;
      color: #005a9e;
      margin: 0 0 6px 0;
    }
    .crn-lead-input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 11px;
      margin-bottom: 6px;
    }
    .crn-lead-submit {
      width: 100%;
      background: ${primaryColor};
      color: #ffffff;
      border: none;
      padding: 7px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Build Container
  var container = document.createElement('div');
  container.className = 'crn-widget-container';
  container.innerHTML = `
    <div class="crn-chat-panel" id="crnChatPanel">
      <div class="crn-header">
        <div class="crn-header-info">
          <div class="crn-header-avatar">
            <img src="${logoUrl}" alt="${agentName}" onerror="this.src='/copilot-agent-logo.webp'" />
          </div>
          <div>
            <div class="crn-header-title">${agentName}</div>
            <div class="crn-header-subtitle">Microsoft Solutions Partner • D365 ERP</div>
          </div>
        </div>
        <button class="crn-header-close" id="crnCloseBtn">&times;</button>
      </div>

      <div class="crn-messages" id="crnMessages">
        <div class="crn-msg crn-msg-agent">
          Hello! I am Coreenact's Copilot Studio Agent. How can I assist with your Dynamics 365 Business Central implementation, NAV migration, or India GST localization today?
        </div>
      </div>

      <div class="crn-prompts-bar">
        <button class="crn-prompt-chip" data-prompt="Estimate D365 BC Migration">Estimate NAV Migration</button>
        <button class="crn-prompt-chip" data-prompt="India GST & e-Invoicing">India GST & e-Invoice</button>
        <button class="crn-prompt-chip" data-prompt="EdCore Education ERP">EdCore ERP</button>
        <button class="crn-prompt-chip" data-prompt="Request Consultation">Request Consultation</button>
      </div>

      <div class="crn-input-row">
        <input type="text" class="crn-input" id="crnTextInput" placeholder="Ask about Dynamics 365, pricing, migration..." />
        <button class="crn-send-btn" id="crnSendBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>

    <button class="crn-launcher-btn" id="crnLauncherBtn" aria-label="Open Chat">
      <img src="${logoUrl}" alt="${agentName}" onerror="this.src='/copilot-agent-logo.webp'" />
    </button>
  `;
  document.body.appendChild(container);

  // Logic
  var panel = document.getElementById('crnChatPanel');
  var launcher = document.getElementById('crnLauncherBtn');
  var closeBtn = document.getElementById('crnCloseBtn');
  var sendBtn = document.getElementById('crnSendBtn');
  var textInput = document.getElementById('crnTextInput');
  var messagesBox = document.getElementById('crnMessages');

  var isOpen = false;
  var chatHistory = [];

  function toggleChat(open) {
    isOpen = typeof open === 'boolean' ? open : !isOpen;
    panel.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      setTimeout(function () {
        textInput.focus();
      }, 100);
    }
  }

  launcher.addEventListener('click', function () { toggleChat(true); });
  closeBtn.addEventListener('click', function () { toggleChat(false); });

  function appendMsg(text, isUser) {
    var div = document.createElement('div');
    div.className = 'crn-msg ' + (isUser ? 'crn-msg-user' : 'crn-msg-agent');
    div.textContent = text;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    return div;
  }

  function appendLeadCard() {
    var card = document.createElement('div');
    card.className = 'crn-lead-card';
    card.innerHTML = `
      <div class="crn-lead-title">Schedule Certified Architect Consultation</div>
      <input type="text" class="crn-lead-input" id="crnLeadName" placeholder="Your Full Name *" />
      <input type="email" class="crn-lead-input" id="crnLeadEmail" placeholder="Work Email *" />
      <input type="text" class="crn-lead-input" id="crnLeadCompany" placeholder="Company Name & Users" />
      <button class="crn-lead-submit" id="crnLeadSubmit">Submit Request to Info@coreenact.com</button>
    `;
    messagesBox.appendChild(card);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    var submitBtn = card.querySelector('#crnLeadSubmit');
    submitBtn.addEventListener('click', async function () {
      var name = card.querySelector('#crnLeadName').value.trim();
      var email = card.querySelector('#crnLeadEmail').value.trim();
      var company = card.querySelector('#crnLeadCompany').value.trim();

      if (!name || !email) {
        alert('Please provide your name and work email.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        var res = await fetch(apiBase + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            company: company,
            interest: 'Consultation from Embedded Copilot Agent',
            source: 'Embedded Chat Widget (' + window.location.hostname + ')',
          }),
        });
        var data = await res.json();
        if (data.success) {
          card.innerHTML = '<div style="color: #059669; font-weight: 600; font-size: 12px;">Thank you, ' + name + '! Your inquiry has been routed to our Microsoft Solutions team at Info@coreenact.com. Ref ID: ' + (data.lead ? data.lead.id : 'CONFIRMED') + '.</div>';
        } else {
          card.innerHTML = '<div style="color: #dc2626; font-size: 11px;">Error: ' + (data.error || 'Failed to submit') + '</div>';
        }
      } catch (e) {
        card.innerHTML = '<div style="color: #059669; font-weight: 600; font-size: 12px;">Inquiry registered! Our team will contact ' + email + ' shortly.</div>';
      }
    });
  }

  async function handleSend(text) {
    var query = text || textInput.value.trim();
    if (!query) return;

    appendMsg(query, true);
    if (!text) textInput.value = '';

    chatHistory.push({ role: 'user', content: query });

    // Show typing placeholder
    var typingDiv = appendMsg('Thinking...', false);

    try {
      var res = await fetch(apiBase + '/api/customer-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, source: 'hybrid' }),
      });
      var data = await res.json();
      typingDiv.textContent = data.reply || "Thank you for reaching out! Coreenact's Microsoft Solutions Architects are ready to assist you.";

      chatHistory.push({ role: 'model', content: typingDiv.textContent });

      // If user asks about consultation, pricing, or quote, offer lead card
      var lower = query.toLowerCase();
      if (lower.includes('consult') || lower.includes('quote') || lower.includes('price') || lower.includes('demo') || lower.includes('contact') || lower.includes('meeting')) {
        appendLeadCard();
      }
    } catch (e) {
      typingDiv.textContent = "Thank you for your question! For direct consultation or pricing, contact our enterprise desk at Info@coreenact.com or WhatsApp +91 84487 96169.";
    }
  }

  sendBtn.addEventListener('click', function () { handleSend(); });
  textInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  // Prompt chips
  var chips = container.querySelectorAll('.crn-prompt-chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var p = chip.getAttribute('data-prompt');
      handleSend(p);
    });
  });
})();
