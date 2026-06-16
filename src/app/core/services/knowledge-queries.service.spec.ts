import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { KnowledgeQueriesService } from './knowledge-queries.service';
import { QuestionRequest, Answer, AnswerFeedback } from '../../models';
import { environment } from './../../../environments/environment';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

const MOCK_REQUEST: QuestionRequest = {
  questionId: 'q_001',
  userId: 'user_123',
  text: 'Can a client go into overdraft on an ISA?',
  domain: 'compliance',
};

const MOCK_ANSWER: Answer = {
  answerId: 'ans_001',
  text: 'Clients must not go into overdraft for ISA or SIPPs payments...',
  citations: [
    {
      type: 'POL',
      title: 'overdrafts_policy.pdf',
      page: 7,
      date: new Date('2025-01-01'),
      snippet: 'ISA and SIPPs accounts must maintain positive balances...',
      sourceUrl: 'https://example.com/overdrafts_policy.pdf',
    },
  ],
  nextSteps: [
    { type: 'IMMEDIATE', title: 'Contact client', description: 'Call the client directly...' },
  ],
  followUpSteps: [
    { title: 'What if a portfolio is projected to go into overdraft?', description: 'Guidance...' },
  ],
  confidenceScore: 0.94,
};

const MOCK_FEEDBACK: AnswerFeedback = {
  questionId: 'q_001',
  answerId: 'ans_001',
  userId: 'user_123',
  rating: 5,
  feedback: 'Very helpful',
  timestamp: new Date(),
};

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('KnowledgeQueriesService', () => {
  let service: KnowledgeQueriesService;
  let httpMock: HttpTestingController;

  // beforeEach runs before every individual test.
  // Angular 21 uses provideHttpClient() + provideHttpClientTesting()
  // instead of the older HttpClientTestingModule.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(KnowledgeQueriesService);
    httpMock = TestBed.inject(HttpTestingController);

    // Ensure real HTTP path is used by default across tests.
    environment.useMockData = false;
  });

  // afterEach verifies no unexpected HTTP requests were left open.
  afterEach(() => {
    httpMock.verify();
  });

  // -------------------------------------------------------------------------
  // Basic instantiation
  // -------------------------------------------------------------------------

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // askQuestion — mock data path
  // -------------------------------------------------------------------------

  describe('askQuestion (mock data)', () => {
    beforeEach(() => {
      environment.useMockData = true;
    });

    it('should return mock answer without making an HTTP call', () =>
      new Promise<void>((resolve) => {
        service.askQuestion(MOCK_REQUEST).subscribe((answer) => {
          expect(answer).toBeTruthy();
          expect(answer.confidenceScore).toBe(0.94);
          resolve();
        });

        // No HTTP request should have been fired.
        httpMock.expectNone(`${environment.apiUrl}/questions/ask`);
      }));
  });

  // -------------------------------------------------------------------------
  // askQuestion — real HTTP path
  // -------------------------------------------------------------------------

  describe('askQuestion (HTTP)', () => {
    it('should POST to the correct endpoint', () => {
      service.askQuestion(MOCK_REQUEST).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(MOCK_REQUEST);

      req.flush(MOCK_ANSWER);
    });

    it('should return a mapped Answer on success', () =>
      new Promise<void>((resolve) => {
        service.askQuestion(MOCK_REQUEST).subscribe((answer) => {
          expect(answer.answerId).toBe('ans_001');
          expect(answer.text).toContain('overdraft');
          expect(answer.citations.length).toBe(1);
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
        req.flush(MOCK_ANSWER);
      }));

    it('should deserialise citation dates into Date objects', () =>
      new Promise<void>((resolve) => {
        // Simulate raw JSON from .NET — dates arrive as ISO strings.
        const rawResponse = {
          ...MOCK_ANSWER,
          citations: [{ ...MOCK_ANSWER.citations[0], date: '2025-01-01T00:00:00Z' }],
        };

        service.askQuestion(MOCK_REQUEST).subscribe((answer) => {
          expect(answer.citations[0].date).toBeInstanceOf(Date);
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
        req.flush(rawResponse);
      }));

    it('should handle a citation with no date gracefully', () =>
      new Promise<void>((resolve) => {
        const rawResponse = {
          ...MOCK_ANSWER,
          citations: [{ ...MOCK_ANSWER.citations[0], date: null }],
        };

        service.askQuestion(MOCK_REQUEST).subscribe((answer) => {
          expect(answer.citations[0].date).toBeUndefined();
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
        req.flush(rawResponse);
      }));

    it('should emit an error on a 500 server response', () =>
      new Promise<void>((resolve) => {
        service.askQuestion(MOCK_REQUEST).subscribe({
          next: () => { throw new Error('Expected an error, not a successful response'); },
          error: (err: Error) => {
            expect(err.message).toContain('500');
            resolve();
          },
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
        req.flush({ title: 'Internal Server Error' }, { status: 500, statusText: 'Server Error' });
      }));

    it('should emit an error on a network failure', () =>
      new Promise<void>((resolve) => {
        service.askQuestion(MOCK_REQUEST).subscribe({
          next: () => { throw new Error('Expected an error'); },
          error: (err: Error) => {
            expect(err.message).toContain('Network error');
            resolve();
          },
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/ask`);
        req.error(new ProgressEvent('error'));
      }));
  });

  // -------------------------------------------------------------------------
  // submitFeedback
  // -------------------------------------------------------------------------

  describe('submitFeedback', () => {
    it('should POST feedback to the correct endpoint', () => {
      service.submitFeedback(MOCK_FEEDBACK).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/questions/feedback`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(MOCK_FEEDBACK);

      req.flush(null);
    });

    it('should complete without emitting a value on success', () =>
      new Promise<void>((resolve) => {
        const emittedValues: void[] = [];

        service.submitFeedback(MOCK_FEEDBACK).subscribe({
          next: (val) => {
            if (val !== null && val !== undefined) {
              emittedValues.push(val);
            }
          },
          complete: () => {
            expect(emittedValues.length).toBe(0);
            resolve();
          },
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/feedback`);
        req.flush(null);
      }));

    it('should emit an error on a 400 bad request', () =>
      new Promise<void>((resolve) => {
        service.submitFeedback(MOCK_FEEDBACK).subscribe({
          next: () => { throw new Error('Expected an error'); },
          error: (err: Error) => {
            expect(err.message).toContain('400');
            resolve();
          },
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/questions/feedback`);
        req.flush({ title: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
      }));
  });
});
