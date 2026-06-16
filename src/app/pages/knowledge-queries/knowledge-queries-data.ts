// This file can be kept for mock data fallback if needed
export const defaultAnswer = 'Clients must not go into overdraft for ISA or SIPPs payments. If this occurs, this needs to be rectified with payment from the client immediately. The portfolio manager should contact the client promptly to arrange for the necessary funds to be deposited. All overdraft incidents must be documented in the client management system and reported to compliance within 24 hours.';

export const citations = [
  { type: 'POL', title: 'overdrafts_policy.pdf', page: 7, date: new Date('01-01-2025'), snippet: 'ISA and SIPPs accounts must maintain positive balances...' },
  { type: 'CAM', title: 'Client_Account_Management.pdf', page: 12, date: new Date('01-03-2024'), snippet: 'Portfolio managers must monitor account balances daily...' }
];

export const suggestedFollowUps = [
  'What actions should be taken if a portfolio is projected to go into overdraft?',
  'What are the notification timelines for overdraft situations?'
];

export const nextActions = [
  { type: 'IMMEDIATE', title: 'Contact client', description: 'Call the client directly...' },
  { type: 'WITHIN 24HRS', title: 'Log incident', description: 'Record all details...' }
];

export const domainOptions = ['All Domains', 'HR', 'Compliance', 'Risk', 'Finance'];
export const regionOptions = ['All Regions', 'Europe', 'Americas', 'Asia Pacific'];
export const docTypeOptions = ['All Types', 'Policy', 'Procedure', 'Guideline'];
export const updateFreqOptions = ['All Frequencies', 'Monthly', 'Quarterly', 'Annual'];
export const dateRangeOptions = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'Last Year'];
