import { Citation, NextAction } from '../../models';

// ============================================
// ANSWER DATA
// ============================================
export const defaultAnswer = 
  'There are limited exceptions to the overdraft policy for ISA accounts. A temporary technical overdraft caused by a system processing delay of less than 24 hours may be logged as a technical incident rather than a policy breach, subject to Compliance approval. No exceptions exist for SIPPs. All exception requests must be submitted to the Head of Compliance in writing within 2 hours of identification.';

// ============================================
// CITATIONS DATA
// ============================================
export const citations: Citation[] = [
  {
    type: 'POL',
    title: 'overdrafts_policy.pdf',
    page: 7,
    date: 'Jan 2025',
    snippet: 'ISA and SIPPs accounts must maintain positive balances at all times. Overdraft situations require immediate client notification and remediation...'
  },
  {
    type: 'CAM',
    title: 'Client_Account_Management.pdf',
    page: 12,
    date: 'Mar 2024',
    snippet: 'Portfolio managers must monitor account balances daily and contact clients immediately upon identifying potential overdraft scenarios...'
  },
  {
    type: 'COM',
    title: 'Compliance_Reporting_Requirements.pdf',
    page: 19,
    date: 'Nov 2024',
    snippet: 'All overdraft incidents must be logged in the compliance system within 24 hours of detection, including client communication records...'
  }
];

// ============================================
// SUGGESTED FOLLOW-UPS DATA
// ============================================
export const suggestedFollowUps = [
  'What actions should be taken if a portfolio is projected to go into overdraft?',
  'What are the notification timelines for overdraft situations?',
  'What penalties apply if overdrafts are not resolved immediately?',
  'How should overdraft incidents be escalated to senior management?'
];

// ============================================
// NEXT ACTIONS DATA
// ============================================
export const nextActions: NextAction[] = [
  {
    type: 'IMMEDIATE',
    title: 'Contact client to arrange overdraft repayment',
    description: 'Call the client directly using the primary contact record. Explain the overdraft situation and request an immediate fund transfer to restore a positive balance. Document the call in the CRM.',
    actions: ['Copy to Email', 'Draft Email in Outlook', 'Import Client Details from Client Space']
  },
  {
    type: 'WITHIN 24HRS',
    title: 'Log overdraft incident in compliance system',
    description: 'Record all details of the overdraft event, including amount, duration, and resolution steps taken.'
    ,   actions: ['Copy to Email', 'Draft Email in Outlook', 'Import Client Details from Client Space']
  },
  {
    type: 'NOTIFY',
    title: 'Send compliance report to regulatory team',
    description: 'Prepare and submit the required regulatory notification within the mandated timeframe.'
    ,   actions: ['Copy to Email', 'Draft Email in Outlook', 'Import Client Details from Client Space']
  },
  {
    type: 'FOLLOW-UP',
    title: 'Confirm funds received and account balance restored',
    description: 'Verify that the account has returned to a positive balance and document the final status.'
    ,   actions: ['Copy to Email', 'Draft Email in Outlook', 'Import Client Details from Client Space']
  }
];

// ============================================
// FILTER OPTIONS DATA
// ============================================
export const domainOptions = [
  'All Domains',
  'Investment',
  'Compliance',
  'Operations',
  'Client Relations',
  'Risk Management',
  'Finance'
];

export const regionOptions = [
  'All Regions',
  'Global',
  'EMEA',
  'Americas',
  'APAC',
  'UK',
  'EU'
];

export const docTypeOptions = [
  'All Types',
  'POL',
  'CAM',
  'COM',
  'ISA',
  'SIPP',
  'PROC'
];

export const updateFreqOptions = [
  'All Frequencies',
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'Annually',
  'Ad-hoc'
];

export const dateRangeOptions = [
  'Last 30 days',
  'Last 90 days',
  'Last 6 months',
  'Last 12 months',
  'Last 2 years',
  'All time'
];

// ============================================
// DEFAULT FILTER VALUES
// ============================================
export const defaultFilters = {
  domain: 'All Domains',
  region: 'All Regions',
  docType: 'All Types',
  updateFreq: 'All Frequencies',
  dateRange: 'Last 30 days'
};