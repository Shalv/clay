import { LeadRecord, LeadSubmissionInput } from './types';

/**
 * Calculates lead quality score (0 - 100) based on provided information
 */
export function calculateLeadScore(lead: Partial<LeadSubmissionInput>): number {
  let score = 30; // base score for reaching out

  if (lead.email) {
    score += 20;
    // Check for corporate/business email domain
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const domain = lead.email.split('@')[1]?.toLowerCase();
    if (domain && !freeDomains.includes(domain)) {
      score += 15; // Corporate domain bonus
    }
  }

  if (lead.phone && lead.phone.trim().length >= 8) {
    score += 15;
  }

  if (lead.company && lead.company.trim().length > 1) {
    score += 10;
  }

  if (lead.interest) {
    score += 10;
  }

  return Math.min(100, score);
}

/**
 * Submit lead to server API endpoint
 */
export async function submitLead(input: LeadSubmissionInput): Promise<{
  success: boolean;
  lead?: LeadRecord;
  message?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    return {
      success: false,
      error: err.message || 'Network error while submitting lead.',
    };
  }
}

/**
 * Fetch all leads from the server
 */
export async function fetchLeads(): Promise<LeadRecord[]> {
  try {
    const res = await fetch('/api/leads');
    if (!res.ok) throw new Error('Failed to fetch leads');
    const data = await res.json();
    return data.leads || [];
  } catch (err) {
    console.warn('Using local fallback leads:', err);
    return [];
  }
}

/**
 * Exports leads to CSV format for CRM import (Dynamics 365, HubSpot, Salesforce)
 */
export function exportLeadsToCsv(leads: LeadRecord[]): void {
  if (!leads || leads.length === 0) return;

  const headers = ['Lead ID', 'Date', 'Full Name', 'Work Email', 'Phone', 'Company', 'Solution Interest', 'Score', 'Stage', 'Notes'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleDateString()}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.interest || '').replace(/"/g, '""')}"`,
    l.score,
    `"${l.stage}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `coreenact_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
