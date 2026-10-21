import { enrollments, knownLearnerIds } from '../data/seed';
import { NotFoundError } from '../errors';
import type { CourseEnrollment, CourseProgress, DeadlineUrgency } from '../types';

/** Days without activity before a course is considered stale (business rule hint). */
export const STALE_DAYS = 30;
export const DEADLINE_URGENCY_DAYS = 7;

/**
 * Return in-progress courses for a learner, sorted by last activity (most recent first).
 *
 * TODO — implement this function to pass `tests/progress.api.test.ts`:
 * - Return 404 via NotFoundError when the learner does not exist in seed data
 * - Include only enrollments with status `in_progress` (exclude completed / not_started)
 * - Compute completionPercentage from completed lessons / total lessons (0–100, rounded)
 * - Map lastActivityAt through to the response
 * - Set isStale: true when last activity is older than STALE_DAYS
 * - Sort by lastActivityAt descending
 *
 * Helper functions below are provided — use, extend, or replace them.
 */
export function getInProgressCourses(learnerId: number, now: Date = new Date()): CourseProgress[] {
  if (!knownLearnerIds.has(learnerId)) {
    throw new NotFoundError(`Learner ${learnerId} not found`);
  }

  return enrollments
    .filter((enrollment) => enrollment.learnerId === learnerId && enrollment.status === 'in_progress')
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
    .map((enrollment) => toCourseProgress(enrollment, now));
}

export function getDeadlineUrgency(deadlineAt: string | null | undefined, now: Date = new Date()): DeadlineUrgency {
  if (deadlineAt == null) {
    return 'no_deadline';
  }

  const deadlineTime = Date.parse(deadlineAt);
  if (!Number.isFinite(deadlineTime)) {
    throw new Error(`Invalid deadline timestamp: ${deadlineAt}`);
  }

  const nowTime = now.getTime();
  if (deadlineTime < nowTime) {
    return 'overdue';
  }

  const urgencyWindowMs = DEADLINE_URGENCY_DAYS * 1000 * 60 * 60 * 24;
  return deadlineTime <= nowTime + urgencyWindowMs ? 'due_soon' : 'on_track';
}

export function computeCompletionPercentage(enrollment: CourseEnrollment): number {
  if (enrollment.lessons.length === 0) {
    return 0;
  }
  const completed = enrollment.lessons.filter((lesson) => lesson.completed).length;
  return Math.round((completed / enrollment.lessons.length) * 100);
}

export function isEnrollmentStale(lastActivityAt: string, now: Date = new Date()): boolean {
  const lastActivity = new Date(lastActivityAt);
  const diffMs = now.getTime() - lastActivity.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > STALE_DAYS;
}

function toCourseProgress(enrollment: CourseEnrollment, now: Date): CourseProgress {
  const deadlineAt = enrollment.deadlineAt ?? null;
  return {
    courseId: enrollment.courseId,
    title: enrollment.title,
    completionPercentage: computeCompletionPercentage(enrollment),
    lastActivityAt: enrollment.lastActivityAt,
    deadlineUrgency: getDeadlineUrgency(deadlineAt, now),
    status: 'in_progress',
    isStale: isEnrollmentStale(enrollment.lastActivityAt, now),
  };
}
