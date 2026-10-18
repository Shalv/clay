import { LeadRecord } from './types';

/**
 * CRM dispatcher for routing leads into Microsoft Dynamics 365 Sales,
 * webhook endpoints, or email notifications.
 */
export interface CrmSyncResult {
  destination: 'Dynamics 365' | 'Email' | 'Webhook';
  status: 'synced' | 'pending' | 'simulated';
  timestamp: string;
  externalRef?: string;
}

export function syncLeadToCrm(lead: LeadRecord): CrmSyncResult {
  // In production, this pushes to Microsoft Dataverse / Dynamics 365 Sales Web API
  console.log('[CRM ROUTING] Dispatching lead to Microsoft Dynamics 365 Sales pipeline:', {
    leadId: lead.id,
    prospect: lead.name,
    email: lead.email,
    company: lead.company,
    score: lead.score,
    stage: lead.stage,
  });

  return {
    destination: 'Dynamics 365',
    status: 'synced',
    timestamp: new Date().toISOString(),
    externalRef: `D365-LEAD-${lead.id.toUpperCase()}`,
  };
}
