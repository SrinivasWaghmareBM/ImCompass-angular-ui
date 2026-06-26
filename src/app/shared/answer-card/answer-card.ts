import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RatingFeedback {
  rating: number;
  feedback?: string;
}

@Component({
  selector: 'app-answer-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './answer-card.html',
  styleUrl: './answer-card.css'
})
export class AnswerCardComponent {
  
  answer = input.required<string>();
  confidence = input.required<number>();

  // Outputs
  ratingSubmitted = output<RatingFeedback>();
  copyClicked = output<void>();

  // Internal state
  userRating = signal<number>(0);
  showFeedbackForm = signal(false);
  feedbackText = signal('');
  feedbackSubmitted = signal(false);
  showThankYouMessage = signal(false);
  copySuccess = signal(false);

  setRating(rating: number) {
    this.userRating.set(rating);
    this.showThankYouMessage.set(true);

    const feedback: RatingFeedback = {
      rating: rating
    };

    // Show feedback form only if rating < 3
    if (rating < 3) {
      this.showFeedbackForm.set(true);
      this.feedbackSubmitted.set(false);
    } else {
      this.showFeedbackForm.set(false);
      this.ratingSubmitted.emit(feedback);
    }

    // Hide thank you message after 4 seconds
    setTimeout(() => {
      this.showThankYouMessage.set(false);
    }, 4000);
  }

  submitFeedback() {
    if (!this.feedbackText().trim()) return;

    const feedback: RatingFeedback = {
      rating: this.userRating(),
      feedback: this.feedbackText().trim()
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

  async copyAnswer() {
    const text = this.answer();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      this.copySuccess.set(true);
      this.copyClicked.emit();

      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy answer:', err);
    }
  }
}
