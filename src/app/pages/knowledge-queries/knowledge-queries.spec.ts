import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { KnowledgeQueriesComponent } from './knowledge-queries';
import { vi } from 'vitest';

describe('KnowledgeQueriesComponent', () => {
  let component: KnowledgeQueriesComponent;
  let fixture: ComponentFixture<KnowledgeQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeQueriesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KnowledgeQueriesComponent);
    component = fixture.componentInstance;

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform search and receive answer from service', () => {
    component.searchQuery.set('What is the overdraft policy?');
    component.performSearch();

    expect(component.hasSearched()).toBe(true);
    expect(component.currentAnswer()).not.toBeNull();
    expect(component.answerId()).toContain('ans_');
  });

  it('should emit rating event when user rates the answer', () => {
    vi.spyOn(component.ratingSubmitted, 'emit');

    component.setRating(4);

    expect(component.userRating()).toBe(4);
    expect(component.ratingSubmitted.emit).toHaveBeenCalled();
  });

  it('should show feedback form only when rating < 3', () => {
    component.setRating(2);
    expect(component.showFeedbackForm()).toBe(true);

    component.setRating(4);
    expect(component.showFeedbackForm()).toBe(false);
  });

  it('should submit feedback with text', () => {
    vi.spyOn(component.ratingSubmitted, 'emit');
    component.feedbackText.set('The answer was incomplete.');

    component.submitFeedback();

    expect(component.feedbackSubmitted()).toBe(true);
    expect(component.ratingSubmitted.emit).toHaveBeenCalled();
  });
});
