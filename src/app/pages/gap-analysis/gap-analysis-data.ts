import { Gap } from '../../models';

export const gapStats = {
  total: 23,
  high: 5,
  inReview: 8,
  resolved: 14
};

export const gaps: Gap[] = [
  {
    id: 1,
    title: 'Proxy Voting Policy - ESG Considerations',
    domain: 'Investment Operations',
    severity: 'High',
    status: 'Open',
    description: 'Current proxy voting policy does not include guidelines for evaluating environmental, social, and governance (ESG) proposals. Policy focuses only on traditional shareholder value considerations.',
    impact: 'Unable to meet client mandates requiring ESG integration. Reputational risk and potential loss of ESG-focused mandates.',
    recommendation: 'Update proxy voting policy to include ESG evaluation framework. Add procedures for assessing climate-related and social proposals.'
  },
  {
    id: 2,
    title: 'Client Communication - Market Volatility Procedures',
    domain: 'Client Relations',
    severity: 'Medium',
    status: 'In Review',
    description: 'Missing detailed guidelines for communicating significant market movements to clients.',
    impact: 'Inconsistent client communications during market volatility.',
    recommendation: 'Develop standard operating procedures for market volatility communications.'
  },
  {
    id: 3,
    title: 'Conflicts of Interest - Personal Trading',
    domain: 'Compliance',
    severity: 'High',
    status: 'Open',
    description: 'Personal trading policy does not cover all new asset classes including crypto and private equity.',
    impact: 'Regulatory risk and potential conflicts of interest.',
    recommendation: 'Expand personal trading policy to cover all asset classes.'
  },
  {
    id: 4,
    title: 'Valuation Procedures - Level 3 Assets',
    domain: 'Portfolio Valuation',
    severity: 'Low',
    status: 'Open',
    description: 'Valuation policy provides limited guidance on frequency and methodology for reviewing Level 3 asset valuations.',
    impact: 'Inconsistent valuation practices across funds. Potential fair value concerns in auditor reviews.',
    recommendation: 'Add quarterly review requirements for Level 3 assets. Define valuation committee escalation procedures.'
  }
];

// ============================================
// QUERY GAP ANALYSIS DATA
// ============================================

export interface QueryGapItem {
  id: number;
  domain: string;
  query: string;
  timesQueried: number;
  avgConfidence: number;
  lastQueried: string;
  riskLevel: 'Risk & Controls' | 'ESG & Stewardship' | 'Operations & Technology' | 'Client Account Management';
}

export interface QueryGapDetail {
  id: number;
  query: string;
  timesQueried: number;
  avgConfidence: number;
  lastQueried: string;
  riskLevel: string;
  gapInsight: string;
  recommendedAction: string;
}

export const queryGapStats = {
  totalQueries: 136,
  activeQueries: 4,
  avgConfidence: 34
};

export const queryGapItems: QueryGapItem[] = [
  {
    id: 1,
    domain: 'ESG & Stewardship',
    query: 'What are the procedures for handling client complaints about ESG mandate alignment?',
    timesQueried: 47,
    avgConfidence: 31,
    lastQueried: '2026-06-09',
    riskLevel: 'ESG & Stewardship'
  },
  {
    id: 2,
    domain: 'Risk & Controls',
    query: 'How should portfolio managers respond to a margin call on a leveraged strategy?',
    timesQueried: 38,
    avgConfidence: 28,
    lastQueried: '2026-06-10',
    riskLevel: 'Risk & Controls'
  },
  {
    id: 3,
    domain: 'Operations & Technology',
    query: 'What is the process for onboarding a new third-party data vendor?',
    timesQueried: 29,
    avgConfidence: 34,
    lastQueried: '2026-06-08',
    riskLevel: 'Operations & Technology'
  },
  {
    id: 4,
    domain: 'Client Account Management',
    query: 'What disclosures are required when changing a client\'s benchmark index?',
    timesQueried: 22,
    avgConfidence: 41,
    lastQueried: '2026-06-07',
    riskLevel: 'Client Account Management'
  }
];

export const queryGapDetails: QueryGapDetail[] = [
  {
    id: 1,
    query: 'What are the procedures for handling client complaints about ESG mandate alignment?',
    timesQueried: 47,
    avgConfidence: 31,
    lastQueried: '2026-06-09',
    riskLevel: 'ESG & Stewardship',
    gapInsight: 'No formal escalation procedure exists for ESG-related client complaints. Current documentation references general client service protocols without specific guidance for mandate alignment disputes.',
    recommendedAction: 'Draft ESG complaint handling procedure with clear escalation paths to ESG Committee and client relationship managers.'
  },
  {
    id: 2,
    query: 'How should portfolio managers respond to a margin call on a leveraged strategy?',
    timesQueried: 38,
    avgConfidence: 28,
    lastQueried: '2026-06-10',
    riskLevel: 'Risk & Controls',
    gapInsight: 'No margin call response procedure exists in current documentation. Queries return fragments from general risk frameworks with insufficient procedural detail.',
    recommendedAction: 'Draft a margin call response procedure covering notification timelines, client authorisation requirements, and escalation to the CRO.'
  }
];