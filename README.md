# Learner Progress MVP

A small learner-facing progress view built with a TypeScript/Express API and the Angular starter. It displays active courses, completion, last activity, stale status, and deadline urgency. The learner selector switches among seeded learner IDs for demonstration; it is not authentication.

## Requirements

- Node.js 20+ and npm
- Ports `3001` (API) and `5173` (Angular) available

## Run the demo

Run the commands in two terminals from the repository root.

**Terminal 1: API**

```bash
npm ci --prefix backend
npm --prefix backend run dev
```

**Terminal 2: Angular UI**

```bash
npm ci --prefix frontend-angular
npm --prefix frontend-angular run dev
```

Open [http://localhost:5173](http://localhost:5173). The UI requests progress through the development proxy. The API health endpoint is [http://localhost:3001/health](http://localhost:3001/health).

## What to try

Use **Choose learner** to switch between the seeded learners. The course list shows completion and activity alongside deadline urgency. The API classifies deadlines as overdue, due within seven days, on track, or no deadline. A structured `course_progress_viewed` event is written to the browser console after each successful API response; it includes learner ID, course count, and event timestamp.

## Tests and builds

```bash
npm --prefix backend test
npm --prefix backend run build
npm --prefix frontend-angular run build
```

## Implementation notes

- Backend data is in memory; this demo does not persist changes.
- The learner selector is a demo control, not a login. In production, authentication middleware would establish identity and authorization would verify access to the requested learner before returning progress.
- The API uses lesson completion count divided by total lesson count, rounded to an integer.
- Deadline urgency compares UTC timestamps; the seven-day boundary is included in “due soon.”
- Console analytics is a local demonstration stub, not persistent or aggregated telemetry.

See [`PRODUCT.md`](./PRODUCT.md) for product scope and [`AI_USAGE.md`](./AI_USAGE.md) to understand how AI is used in this assessment completion.
