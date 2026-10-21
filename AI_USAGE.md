# AI Usage

## Tools used

GitHub Copilot in Visual Studio Code and Claude

## What AI helped with

| Area | How AI was used | My involvement |
|------|-----------------|----------------|
| Assessment planning | Helped break down the spec into a checklist and prioritize required work over optional scope. | I provided the requirements and used the checklist to track requirements. |
| Backend rule and tests | Helped implement deadline urgency and focused tests for overdue, due-soon, on-track, no-deadline, and seven-day boundary cases. | I chose deadline urgency, reviewed the classification and boundary behavior, and ran the backend tests and build. |
| Angular UI | Helped implement loading/error/empty states, the seeded learner selector, urgency labels and colors, and a structured progress-view event. | I specified and iterated on the user-facing behavior and presentation, including selector placement, labels, and urgency colors. |
| Documentation | Helped draft and revise the README, product notes, assessment checklist, and other documentations. | I supplied the product choices and revised the wording to reflect the intended scope and tradeoffs. |

## What I rejected or rewrote

I validated an AI suggestion to add SQLite persistence and an authentication workflow, but left both out to keep the assessment focused on the required progress list. The seeded learner dropdown is the convenient option for easy navigations.

## What I'd do differently without AI

Without AI, I would use the same scoped approach, but spend more time exploring edge cases, writing the deadline-boundary tests, and organizing the documentation and validation checklist.

## Ownership statement

I completely understand the progress API work flow, deadline classification and boundary tests, Angular request states and learner selection, and the structured console analytics event. I can also make needed changes in these implementations without AI assistance.


