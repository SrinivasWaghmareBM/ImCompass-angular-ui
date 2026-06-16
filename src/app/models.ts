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
  date: Date;
  affected: string[];
  changes?: PolicyChange[];
}

export interface StatCardData {
  label: string;
  value: string | number;
  //change?: string;
  //changeType?: 'success' | 'warning' | 'danger' | 'info';
}

// Models for Gap Analysis

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

// Models for Knowledge Queries

// Request sent to backend
export interface QuestionRequest {  
  questionId: string;
  userId: string;
  text: string;
  domain?: string; 
  docType?: string;
  lastUpdated?: Date; 
}

// Response from backend
export interface Answer {
  answerId: string;
  text: string;
  citations: Citation[];
  followUpSteps: FollowUpStep[];
  nextSteps: NextAction[];
  confidenceScore: number;
}

export interface Citation {
  type: string;
  title: string;
  page: number;
  date?: Date;
  snippet: string;
  sourceUrl: string;
}

export interface NextAction {
  type: 'IMMEDIATE' | 'WITHIN 24HRS' | 'NOTIFY' | 'FOLLOW-UP';
  title: string;
  description: string;
  actions?: string[];
}

export interface FollowUpStep { 
  title: string;
  description: string; 
}

// Answer Feedback model
export interface AnswerFeedback {
  questionId: string;
  answerId: string;
  userId: string;
  rating: number;
  feedback?: string;
  timestamp: Date;
}

export interface QuickLinkData {
  icon: string;
  title: string;
  subtitle: string;
  route: string;
}

export interface ActivityItem {
  text: string;
  time: string;
  status: string;
}
