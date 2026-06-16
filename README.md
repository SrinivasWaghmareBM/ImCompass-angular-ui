# ImCompass

ImCompass is an Angular 21 application for compliance, risk assessment, and knowledge query workflows. It provides a dashboard shell, gap analysis and change impact pages, and a knowledge query flow that submits user questions, renders answers, and captures feedback.

## Project overview

- `src/app/app.ts` and `src/app/app.html` provide the app shell, the page title, and the router outlet.
- `src/app/core/services/knowledge-queries.service.ts` handles API calls for question submission and feedback.
- `src/app/models.ts` defines shared application data models such as `QuestionRequest`, `Answer`, `AnswerFeedback`, `Gap`, and others.
- `src/app/pages/knowledge-queries/knowledge-queries.ts` coordinates search state, service calls, result display, and feedback submission.
- Shared UI components in `src/app/shared/` display cards, citations, follow-up items, and results.

## How the application works

1. A user enters a question on the Knowledge & Queries page.
2. `KnowledgeQueriesComponent.performSearch()` builds a `QuestionRequest` and calls `KnowledgeQueriesService.askQuestion()`.
3. `KnowledgeQueriesService` posts the data to `environment.apiUrl/questions/ask`.
4. The backend response is mapped into the `Answer` model and displayed in the UI.
5. If the user provides a rating or additional feedback, the component sends an `AnswerFeedback` payload to `environment.apiUrl/questions/feedback`.

## Service and model interaction

- `QuestionRequest` includes `userId`, `questionId`, `text`, and optional filter fields like `domain` and `docType`.
- `Answer` returns the response text, citations, next actions, follow-up steps, and a `confidenceScore`.
- `AnswerFeedback` records rating, optional feedback text, timestamp, and contextual IDs.
- `KnowledgeQueriesService` uses Angular's `HttpClient` and maps the API response before it reaches the UI.
- Error handling is centralized, so HTTP failures are converted into readable error messages and can be asserted in tests.

## Development server

Start the app locally with:

```bash
ng serve
```

Open `http://localhost:4200/` in your browser. The application reloads automatically after source changes.

## Running unit tests

Run the unit tests with:

```bash
ng test
```

This project uses [Vitest](https://vitest.dev/) together with Angular test utilities.

## Build

Create a production build with:

```bash
ng build
```

Output files are written to the `dist/` folder.

## Notes

- `environment.useMockData` can be used during development to bypass backend calls.
- Keep shared models in `src/app/models.ts` and let `KnowledgeQueriesService` handle API interactions.
- When adding new components, use Angular standalone components and import `CommonModule` where needed.

## Additional resources

For Angular CLI documentation, see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
