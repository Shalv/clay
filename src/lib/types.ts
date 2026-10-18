export type LeadStage = 'new' | 'qualified' | 'contacted' | 'scheduled' | 'closed';

export interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  timeframe?: string;
  notes?: string;
  source: string;
  score: number;
  stage: LeadStage;
  ipAddress?: string;
  chatSnippet?: string;
}

export interface LeadSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  timeframe?: string;
  notes?: string;
  source?: string;
  chatSnippet?: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  primaryColor: string;
  welcomeMessage: string;
  samplePrompts: string[];
  enableLeadCapture: boolean;
  leadCapturePrompt: string;
  targetNotificationEmail: string;
  poweredBy: string;
}
