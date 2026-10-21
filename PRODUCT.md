# Product Notes

## User problem

Learners can lose track of where they left off across multiple active / in-progress courses. A compact progress view makes completion, recent activity, stale status and deadlines visible so learners can decide what to priorotize.

## MVP scope

The MVP serves seeded learner progress from an in-memory API and presents in-progress courses in the Angular UI. The view shows completion percentage, last activity, deadline urgency, and stale status, with loading, error, retry, and empty states based on the API responses. A learner dropdown lets the user switch among seeded learner IDs 1, 2, and 3.

## Extra business rule

Each course is classified by its deadline: `overdue` if the deadline is before the current date, `due_soon` from now through exactly seven days, `on_track` if there are more than 7 days to the deadline date, and `no_deadline` if no deadline is set for a course. This gives learners a prioritization signal. Backend tests cover past, current, exact seven-day, just-beyond-seven-day, and missing deadlines, plus seeded API examples.

## What I intentionally cut

| Cut | Why |
|-----|-----|
| Persistent storage | In-memory seed data is enough for this read-only local MVP. |
| Course details view on click | The MVP first validates whether the progress list helps learners re-engage. A detail view can follow if pilot engagement supports expanding the feature. |

## Success metric

- Metric name: Progress view to course resume conversion.
- How you'd measure it: Calcualte the number of unique learner sessions with a `course_resumed` (assume, this will be added in the workflow as part of the feature expansion) event within 24 hours after `course_progress_viewed` event emitted
- What "good" looks like in the first 30 days: In a pilot, target at least 25% - 30% view to resume conversion and a result at least 5 percentage points above a comparable group without the progress view. Treat these as initial assessment steps. 

## Assumptions

- Persistence: in-memory seed data; This was enough to showcase the actual feature implementation in this case.
- Demo identity: a dropdown selects seeded learner IDs 1–3; This is not authentication. In production, middleware would establish the identity, and authorization would ensure the requested learner matches it before returning data. In this demo, a dropdown looked like the right choice for easy navigation between different learner's views
- Completion formula: rounded completed-lesson count divided by total lessons; an empty lesson list reports 0%.
- Time zones: timestamps are UTC instants; the browser formats dates in the local time zone, while deadline comparisons operate on instants.
- Analytics: the browser logs a structured `course_progress_viewed` event to the console after each successful progress response. The event includes the selected learner ID, returned course count, and an ISO-8601 UTC timestamp. It also fires for a successful empty result, but not for a failed request. This is a local assessment stub, not persistent telemetry or a production analytics integration. It was enough to display the event emitted in that workflow.

## What I'd build next

- Replace the learner selector and in-memory data with secure authentication and persistent learner progress.
- Persist structured `course_progress_viewed` and `course_resumed` events, then measure 24-hour view-to-resume conversion and compare it with a control group.
- Add urgency filters and sorting for overdue, due-soon, on-track, and no-deadline courses so learners can prioritize what to work on.
