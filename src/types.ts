export type KnowledgeSource = 'website' | 'google' | 'hybrid';

export interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
  roleUsed?: string;
  roleTitle?: string;
  sourceUsed?: KnowledgeSource;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
  isLocalFallback?: boolean;
}

export type ChatRole = 'architect' | 'consultant' | 'fast' | 'ai_specialist';

export interface GroundingChunk {
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        snippet?: string;
        author?: string;
      }>;
    };
  };
  web?: {
    uri?: string;
    title?: string;
  };
}

export type PageType =
  | 'home'
  | 'solutions'
  | 'services'
  | 'ai-agents'
  | 'digital-marketing'
  | 'industries'
  | 'about'
  | 'case-studies'
  | 'resources'
  | 'contact'
  | 'privacy-policy';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  color: string;
  image: string;
  description: string;
  phases: string[];
  deliverables: string[];
  benefits: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  color: string;
  challenges: string[];
  solutions: string[];
  d365Features: string[];
  resultMetric: { label: string; value: string };
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  color: string;
  accentGradient: string;
  iconName: string;
  description: string;
  capabilities: string[];
  metrics: { label: string; value: string };
  microsoftStack: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  outcome: string;
  stats: Array<{ label: string; value: string; color: string }>;
  badgeColor: string;
}
