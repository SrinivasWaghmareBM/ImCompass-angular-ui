import { Policy } from '../../models';

export const samplePolicies: Policy[] = [
  {
    id: 1,
    title: 'Best Execution Policy',
    version: 'v3.2',
    description: 'Updated best execution requirements for fixed income and added crypto asset guidelines',
    date: new Date('2025-05-28'),
    affected: ['Trading Desk', 'Portfolio Management', 'Compliance'],
    changes: [
      { type: 'Added', description: 'Section 4.3: Crypto Asset Execution - Added requirements for digital asset venue selection and pricing transparency' },
      { type: 'Modified', description: 'Section 2.1: Fixed Income Execution - Updated benchmark pricing requirements from daily to intraday' },
      { type: 'Added', description: 'Section 5.2: Execution Quality Monitoring - Added quarterly TCA analysis requirement for all asset classes' }
    ]
  },
  {
    id: 2,
    title: 'Proxy Voting Policy',
    version: 'v2.8',
    description: 'Integrated ESG considerations and climate-related shareholder proposals',
    date: new Date('2026-01-15'),
    affected: ['Portfolio Management', 'ESG Team', 'Operations'],
    changes: [
      { type: 'Added', description: 'Section 3.4: ESG Voting Guidelines - New framework for climate-related shareholder proposals' },
      { type: 'Modified', description: 'Section 1.2: Voting Authority - Clarified delegation rules for ESG-focused funds' }
    ]
  },
  {
    id: 3,
    title: 'Personal Trading Policy',
    version: 'v4.1',
    description: 'Expanded pre-clearance requirements to cover all securities',
    date: new Date('2026-05-01'),
    affected: ['All Investment Staff', 'Compliance'],
    changes: [
      { type: 'Modified', description: 'Section 2.1: Pre-Clearance Scope - Extended to include ETFs, mutual funds, and crypto assets' },
      { type: 'Added', description: 'Section 4.3: 30-Day Holding Period - New requirement for all personal trades' }
    ]
  }
];
