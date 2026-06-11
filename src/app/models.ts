export interface PolicyChange {
    type: 'Added' | 'Modified' | 'Removed';
    description: string;
  }
  
  export interface Policy {
    id: number;
    title: string;
    version: string;
    impact: 'High' | 'Medium' | 'Low';
    description: string;
    date: string;
    affected: string[];
    changes?: PolicyChange[];
  }
  
  export interface Citation {
    type: string;
    title: string;
    page: number;
    date?: string;
    snippet: string;
    
  }

  export interface NextAction {
    type: 'IMMEDIATE' | 'WITHIN 24HRS' | 'NOTIFY' | 'FOLLOW-UP';
    title: string;
    description: string;
    actions?: string[];
  }
  

  export interface Gap {
    id: number;
    title: string;
    domain: string;
    severity: 'High' | 'Medium' | 'Low';
    status: string;
    description: string;
    impact: string;
    recommendation: string;
  }