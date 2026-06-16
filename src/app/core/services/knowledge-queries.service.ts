import { environment } from './../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuestionRequest, Answer, AnswerFeedback } from '../../models';

const MOCK_ANSWER: Answer = {
  answerId: 'ans_' + Date.now(),
  text: 'Clients must not go into overdraft for ISA or SIPPs payments...',
  citations: [
    {
      type: 'POL',
      title: 'overdrafts_policy.pdf',
      page: 7,
      date: new Date('01-01-2025'),
      snippet: 'ISA and SIPPs accounts must maintain positive balances...',
      sourceUrl: 'https://example.com/overdrafts_policy.pdf',
    },
    {
      type: 'CAM',
      title: 'Client_Account_Management.pdf',
      page: 12,
      date: new Date('01-03-2024'),
      snippet: 'Portfolio managers must monitor account balances daily...',
      sourceUrl: 'https://example.com/Client_Account_Management.pdf',
    },
  ],
  nextSteps: [
    { type: 'IMMEDIATE', title: 'Contact client', description: 'Call the client directly...' },
    { type: 'WITHIN 24HRS', title: 'Log incident', description: 'Record all details...' },
  ],
  followUpSteps: [
    {
      title: 'What actions should be taken if a portfolio is projected to go into overdraft?',
      description: 'Guidance on steps to mitigate overdraft risks...',
    },
    {
      title: 'What are the notification timelines for overdraft situations?',
      description: 'Details on when and how to notify stakeholders...',
    },
  ],
  confidenceScore: 0.94,
};

@Injectable({ providedIn: 'root' })
export class KnowledgeQueriesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/questions`;

  /**
   * Submits a question and returns an Answer.
   * Uses mock data when environment.useMockData is true.
   */
  askQuestion(request: QuestionRequest): Observable<Answer> {
    if (environment.useMockData) {
      return of(MOCK_ANSWER);
    }

    return this.http
      .post<Answer>(`${this.baseUrl}/ask`, request)
      .pipe(
        map((answer) => this.deserialiseAnswer(answer)),
        catchError(this.handleError)
      );
  }

  /**
   * Submits feedback for a given answer.
   */
  submitFeedback(feedback: AnswerFeedback): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/feedback`, feedback)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deserialises date strings from the API response into proper Date objects.
   * .NET JSON serialisation returns ISO 8601 strings; Angular's HttpClient
   * does not automatically coerce them.
   */
  private deserialiseAnswer(raw: Answer): Answer {
    return {
      ...raw,
      citations: raw.citations?.map((c) => ({
        ...c,
        date: c.date ? new Date(c.date) : undefined,
      })),
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    if (error.status === 0) {
      message = `Network error: ${error.message}`;
    } else {
      const errorText = error.error?.detail ?? error.error?.title ?? error.statusText;
      message = `Server error ${error.status}: ${errorText}`;
    }

    console.error('[KnowledgeQueriesService]', message, error);
    return throwError(() => new Error(message));
  }
}
