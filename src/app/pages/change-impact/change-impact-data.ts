import { Policy } from '../../models';

export const policies: Policy[] = [
  {
    id: 1,
    title: 'Best Execution Policy',
    version: 'v3.2',
    impact: 'High',
    description: 'Updated best execution requirements for fixed income and added crypto asset guidelines',
    date: '2026-05-28',
    affected: ['Trading Desk', 'Portfolio Management', 'Compliance'],
    changes: [
      { type: 'Added', description: 'Section 4.2: Crypto Asset Execution - New guidelines for cryptocurrency best execution' },
      { type: 'Modified', description: 'Section 2.1: Fixed Income Execution - Updated benchmark criteria and latency requirements' },
      { type: 'Removed', description: 'Appendix A: Legacy equity execution guidelines (archived)' }
    ]
  },
  {
    id: 2,
    title: 'Proxy Voting Policy',
    version: 'v2.8',
    impact: 'Medium',
    description: 'Integrated ESG considerations and climate-related shareholder proposals',
    date: '2026-05-15',
    affected: ['Portfolio Management', 'ESG Team', 'Operations'],
    changes: [
      { type: 'Added', description: 'Section 3.4: ESG Proposal Evaluation - Framework for assessing environmental and social shareholder proposals' },
      { type: 'Modified', description: 'Section 2.2: Board Composition - Updated independence criteria to include diversity considerations' },
      { type: 'Removed', description: 'Appendix B: Legacy voting guidelines for 2020-2024 (archived)' }
    ]
  },
  {
    id: 3,
    title: 'Personal Trading Policy',
    version: 'v4.1',
    impact: 'High',
    description: 'Expanded pre-clearance requirements to cover all securities',
    date: '2026-05-10',
    affected: ['All Investment Staff', 'Compliance'],
    changes: [
      { type: 'Added', description: 'Section 1.5: Pre-clearance for Derivatives and Structured Products' },
      { type: 'Modified', description: 'Section 3.2: Reporting Requirements - Updated frequency to 24 hours for all trades' }
    ]
  }
];