import { environment } from './../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuestionRequest, Answer, AnswerFeedback } from '../../models';

const MOCK_ANSWER: Answer = {
  "questionId": "q1",
  "answerId": "a1",
  "text": "There is no explicit guidance or procedure specifically titled 'drift management' for trade placement on client accounts in the currently indexed guidance documents. However, general requirements apply: any material deviation from policy or procedure (such as significant portfolio drift or trade deviation) must be formally approved by the relevant policy owner or committee. For example, the Best Execution Policy requires formal approval from the Chief Operating Officer for any material deviations. If you are managing portfolio drift as part of trade implementation and are unsure if your action constitutes a material deviation, you should seek approval from the policy owner or escalate to the relevant committee. For further clarity, contact the Investment Operations policy owner or Compliance.",
  "citations": [
    {
      "type": "policy",
      "title": "Best Execution Policy v7.pdf",
      "page": 3,
      "date": new Date('01-06-2025'),
      "snippet": "\"Any material deviations from this policy must be formally approved by the Chief Operating Officer.\"",
      "sourceUrl": "https://brooksmacdonaldgroup.sharepoint.com/:b:/r/sites/PolicyHub/Policies/008.%20Operational%20Investment%20Services/Best%20Execution%20Policy%20v7.pdf?csf=1&web=1&e=R1bDNY"
    },
    {
      "type": "policy",
      "title": "Trade Reporting Policy v4.2.pdf",
      "page": 2,
      "date": new Date('01-06-2025'),
      "snippet": "\"Any material deviations from this policy must be formally approved by the Group Policy Committee.\"",
      "sourceUrl": "https://brooksmacdonaldgroup.sharepoint.com/:b:/r/sites/PolicyHub/Policies/008.%20Operational%20Investment%20Services/Trade%20Reporting%20Policy%20v4.2.pdf?csf=1&web=1&e=SyZn2j"
    }
  ],
  "followUpSteps": [
    {
      "title": "NOTIFY",
      "description": "Is my intended trade or portfolio adjustment considered a material deviation requiring approval?"
    },
    {
      "title": "FOLLOW-UP",
      "description": "Who is the current policy owner for Investment Operations or the relevant committee for escalation?"
    }
  ],
  "nextSteps": [
    {
      "type": "IMMEDIATE",
      "title": "Assess for Material Deviation",
      "description": "Review your intended trade for any material deviation from policy or procedure (e.g., significant portfolio drift).",
      "actions": [
        "Compare the proposed trade against the relevant policy requirements.",
        "Determine if the deviation is material (i.e., significant enough to impact client outcomes or policy compliance)."
      ]
    },
    {
      "type": "NOTIFY",
      "title": "Seek Formal Approval if Deviation is Material",
      "description": "If the deviation is material, escalate for formal approval to the Chief Operating Officer or relevant committee.",
      "actions": [
        "Document the nature and rationale for the deviation.",
        "Submit the deviation for approval to the Chief Operating Officer or Group Policy Committee as required."
      ]
    }
  ],
  "confidenceScore": 0.7
  }

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
