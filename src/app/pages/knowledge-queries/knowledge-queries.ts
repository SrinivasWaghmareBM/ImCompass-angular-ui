import { Component, signal, computed, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnowledgeQueriesService } from '../../core/services/knowledge-queries.service';
import { QuestionRequest, Answer, AnswerFeedback } from '../../models';
import { AnswerCardComponent } from '../../shared/answer-card/answer-card';
import { CitationsCardComponent } from '../../shared/citations-card/citations-card';
import { FollowupCardComponent } from '../../shared/followup-card/followup-card';
import { NextActionsCardComponent } from '../../shared/next-actions-card/next-actions-card';

@Component({
  selector: 'app-knowledge-queries',
  imports: [
    CommonModule, 
    FormsModule, 
    AnswerCardComponent,
    CitationsCardComponent,
    FollowupCardComponent, 
    NextActionsCardComponent
  ],
  templateUrl: './knowledge-queries.html',
  styleUrl: './knowledge-queries.css'
})
export class KnowledgeQueriesComponent {
  
  private knowledgeService = inject(KnowledgeQueriesService);

  answerId = signal('');
  userId = signal('user_12345');

  // Current question tracking
  currentQuestionId = signal('');

  // Previous question context (shown above answer when using follow-ups)
  previousQuestion = signal<{ questionId: string; text: string } | null>(null);

  searchQuery = signal('Is there any guidance for drift management when placing trades on client account?');
  selectedDocType = signal('all');
  selectedDomain = signal('all');
  selectedDateLastUpdated = signal('all');
  hasSearched = signal(false);
  confidenceScore = signal(0);
  searchResults = signal<any[]>([]);
  activeFilterDropdown = signal<string | null>(null);
  copySuccess = signal(false);
  currentAnswer = signal<Answer | null>(null);
  
  onDocTypeFilterChange(value: string){
    this.selectedDocType.set(value);
  }

  onDomainFilterChange(value: string) {
    this.selectedDomain.set(value);
  }

  onDateLastUpdatedFilterChange(value: string){
    this.selectedDateLastUpdated.set(value);
}

// Check if any filter is active
hasActiveFilters(): boolean {
  return this.searchQuery() !== '' ||
         this.selectedDocType() !== 'all' ||
         this.selectedDomain() !== 'all' ||
         this.selectedDateLastUpdated() !== 'all' ;
}

  // Suggested Follow-ups + Next Actions
  suggestedFollowUpsList = signal<string[]>([
    'What are the notification timelines for overdraft situations?',
    'Are there any exceptions to the overdraft policy for ISAs?',
    'What penalties apply if overdrafts are not resolved immediately?',
    'How should overdraft incidents be escalated to senior management?'
  ]);

  nextActionsList = signal<any[]>([
    { type: 'IMMEDIATE', title: 'Contact client', description: 'Call the client directly to arrange repayment' },
    { type: 'WITHIN 24HRS', title: 'Log incident', description: 'Record the overdraft in compliance system' },
    { type: 'NOTIFY', title: 'Send report', description: 'Send compliance report to regulatory team' }
  ]);
 
  selectedFilters = signal({
    domain: 'All Domains',
    docType: 'All Types',
    dateLastUpdated: 'Date Last Updated',
  });

  hasResults = computed(() => this.searchResults().length > 0);
 
  @Output() ratingSubmitted = new EventEmitter<AnswerFeedback>();

  getFilterDisplayValue(filterType: string): string {
    const filters = this.selectedFilters();
    const value = (filters as any)[filterType];
    const labels: any = {
      domain: 'Domain',
      docType: 'Document Type',
      dateLastUpdated: 'Date Last Updated'
    };
    if (value && !value.startsWith('All') && value !== 'Date Last Updated') return value;
    return labels[filterType] || filterType;
  }

  toggleFilterDropdown(type: string) {
    this.activeFilterDropdown.set(this.activeFilterDropdown() === type ? null : type);
  }

  selectFilterOption(type: string, value: string) {
    const current = this.selectedFilters();
    this.selectedFilters.set({ ...current, [type]: value });
    this.activeFilterDropdown.set(null);
  }

  clearAllFilters() {    
    this.searchQuery.set('');
    this.selectedDocType.set('all');
    this.selectedDomain.set('all');
    this.selectedDateLastUpdated.set('all');
  }

  performSearch() {
    const query = this.searchQuery().trim();
    if (!query) return;

    // Generate new questionId for every new search
    const newQuestionId = 'q_' + Date.now();
    this.currentQuestionId.set(newQuestionId);

    const filters = this.selectedFilters();
    const request: QuestionRequest = {
      userId: this.userId(),
      questionId: newQuestionId,
      text: query,
      domain: filters.domain !== 'All Domains' ? filters.domain : undefined,
      docType: filters.docType !== 'All Types' ? filters.docType : undefined,
      dateLastUpdated: filters.dateLastUpdated !== 'Date Last Updated' ? filters.dateLastUpdated : undefined
    };

    this.knowledgeService.askQuestion(request).subscribe((answer: Answer) => {
      this.currentAnswer.set(answer);
      this.answerId.set(answer.answerId);
      this.confidenceScore.set(answer.confidenceScore);
      this.hasSearched.set(true);
      this.searchResults.set([1]);
      this.copySuccess.set(false);
    });
  }

  // Handle rating + feedback from AnswerCardComponent
  onRatingSubmitted(feedback: { rating: number; feedback?: string }) {
    const ratingFeedback: AnswerFeedback = {
      questionId: this.currentQuestionId(),
      answerId: this.answerId(),
      userId: this.userId(),
      rating: feedback.rating,
      feedback: feedback.feedback,
      timestamp: new Date()
    };

    this.ratingSubmitted.emit(ratingFeedback);
    console.log('Rating submitted from AnswerCard:', ratingFeedback);
  }

  // Copy answer to clipboard
  async copyAnswer() {
    const answerText = this.currentAnswer()?.text || '';
    if (!answerText) return;

    try {
      await navigator.clipboard.writeText(answerText);
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy answer:', err);
    }
  }

  // Handle follow-up selection from FollowupCardComponent
  onFollowupSelected(followup: string) {
    // Save current question + questionId as previous context
    if (this.searchQuery().trim() && this.currentQuestionId()) {
      this.previousQuestion.set({
        questionId: this.currentQuestionId(),
        text: this.searchQuery()
      });
    }

    // Generate a new questionId for the follow-up
    const newQuestionId = 'q_' + Date.now();
    this.currentQuestionId.set(newQuestionId);

    // Set the follow-up as the new search query
    this.searchQuery.set(followup);
    this.performSearch();
  }
}
