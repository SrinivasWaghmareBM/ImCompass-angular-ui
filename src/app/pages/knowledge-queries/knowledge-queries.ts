import { Component, signal, computed, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnowledgeQueriesService } from '../../core/services/knowledge-queries.service';
import { QuestionRequest, Answer, AnswerFeedback } from '../../models';
import { NextActionsCardComponent } from '../../shared/next-actions-card/next-actions-card'; 
import { CitationsCardComponent } from '../../shared/citations-card/citations-card';
import { AnswerCardComponent } from '../../shared/answer-card/answer-card';
import { FollowupCardComponent } from '../../shared/followup-card/followup-card';

@Component({
  selector: 'app-knowledge-queries',
  imports: [CommonModule, FormsModule, NextActionsCardComponent, CitationsCardComponent,  ],
  templateUrl: './knowledge-queries.html',
  styleUrl: './knowledge-queries.css'
})
export class KnowledgeQueriesComponent {
  
  private knowledgeService = inject(KnowledgeQueriesService);

  questionId = signal('');
  answerId = signal('');
  userId = signal('user_12345');

  searchQuery = signal('');
  hasSearched = signal(false);
  confidenceScore = signal(0);
  searchResults = signal<any[]>([]);
  activeFilterDropdown = signal<string | null>(null);
  userRating = signal<number>(0);
  showFeedbackForm = signal(false);
  feedbackText = signal('');
  feedbackSubmitted = signal(false);
  showThankYouMessage = signal(false);
  copySuccess = signal(false);

  currentAnswer = signal<Answer | null>(null);

  // Updated to only 3 dropdowns
  domainOptionsList = ['All Domains', 'HR', 'Compliance', 'Risk', 'Finance'];
  docTypeOptionsList = ['All Types', 'Policy', 'Procedure', 'Guideline'];
  dateLastUpdatedOptionsList = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'Last Year'];

  selectedFilters = signal({
    domain: 'All Domains',
    docType: 'All Types',
    dateLastUpdated: 'Last 30 days'
  });

  hasResults = computed(() => this.searchResults().length > 0);

  hasActiveFilters = computed(() => {
    const f = this.selectedFilters();
    return f.domain !== 'All Domains' || 
           f.docType !== 'All Types' || 
           f.dateLastUpdated !== 'Last 30 days';
  });

  @Output() ratingSubmitted = new EventEmitter<AnswerFeedback>();

  getFilterDisplayValue(filterType: string): string {
    const filters = this.selectedFilters();
    const value = (filters as any)[filterType];
    const labels: any = {
      domain: 'Domain',
      docType: 'Document Type',
      dateLastUpdated: 'Date Last Updated'
    };
    if (value && !value.startsWith('All') && value !== 'Last 30 days') return value;
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

  clearSingleFilter(type: any) {
    const defaults: any = {
      domain: 'All Domains',
      docType: 'All Types',
      dateLastUpdated: 'Last 30 days'
    };
    this.selectedFilters.set({ ...this.selectedFilters(), [type]: defaults[type] });
  }

  clearAllFilters() {
    this.selectedFilters.set({
      domain: 'All Domains',
      docType: 'All Types',
      dateLastUpdated: 'Last 30 days'
    });
  }

  performSearch() {
    const query = this.searchQuery().trim();
    if (!query) return;

    const filters = this.selectedFilters();
    const request: QuestionRequest = {
      userId: this.userId(),
      // Generate a unique question ID (could be improved with a proper UUID generator)
      questionId:  'q_' + Date.now(),
      text: query,
      domain: filters.domain !== 'All Domains' ? filters.domain : undefined,
      docType: filters.docType !== 'All Types' ? filters.docType : undefined  
    };

    this.knowledgeService.askQuestion(request).subscribe((answer: Answer) => {
      this.questionId.set(request.questionId);
      this.currentAnswer.set(answer);
      this.answerId.set(answer.answerId);
      this.confidenceScore.set(answer.confidenceScore);
      this.hasSearched.set(true);
      this.searchResults.set([1]);
      this.userRating.set(0);
      this.showFeedbackForm.set(false);
      this.feedbackSubmitted.set(false);
      this.feedbackText.set('');
      this.showThankYouMessage.set(false);
      this.copySuccess.set(false);
    });
  }

  // Copy answer to clipboard
  async copyAnswer() {
    const answerText = this.currentAnswer()?.text || '';
    if (!answerText) return;
  
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(answerText);
        this.showCopySuccess();
        return;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }
  
    // Fallback for older browsers or non-secure contexts
    this.fallbackCopy(answerText);
  }
  
  private showCopySuccess() {
    this.copySuccess.set(true);
    setTimeout(() => this.copySuccess.set(false), 2000);
  }
  
  private fallbackCopy(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showCopySuccess();
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  
    document.body.removeChild(textArea);
  }

  setRating(rating: number) {
    this.userRating.set(rating);
    this.showThankYouMessage.set(true);

    const feedback: AnswerFeedback = {
      questionId: this.questionId(),
      answerId: this.answerId(),
      userId: this.userId(),
      rating,
      timestamp: new Date()
    };

    this.ratingSubmitted.emit(feedback);
    
    // Show feedback form only if rating is less than 3
    if (rating < 3) {
      this.showFeedbackForm.set(true);
      this.feedbackSubmitted.set(false);
    } else {
      this.showFeedbackForm.set(false);
    }

    setTimeout(() => this.showThankYouMessage.set(false), 4000);
  }

  submitFeedback() {
    if (!this.feedbackText().trim()) return;

    const feedback: AnswerFeedback = {
      questionId: this.questionId(),
      answerId: this.answerId(),
      userId: this.userId(),
      rating: this.userRating(),
      feedback: this.feedbackText().trim(),
      timestamp: new Date()
    };

    this.ratingSubmitted.emit(feedback);
    this.feedbackSubmitted.set(true);
    this.showFeedbackForm.set(false);
    this.showThankYouMessage.set(true);

    setTimeout(() => {
      this.feedbackSubmitted.set(false);
      this.feedbackText.set('');
      this.showThankYouMessage.set(false);
    }, 3000);
  }


  cancelFeedback() {
    this.showFeedbackForm.set(false);
    this.feedbackText.set('');
  }
}
