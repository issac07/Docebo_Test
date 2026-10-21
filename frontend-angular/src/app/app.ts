import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import type { CourseProgress, LearnerProgressResponse } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  readonly availableLearnerIds = [1, 2, 3];
  learnerId = 1;
  courses: CourseProgress[] = [];
  state: 'loading' | 'loaded' | 'error' = 'loading';
  private request?: Subscription;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.request?.unsubscribe();
    this.state = 'loading';
    this.request = this.http
      .get<LearnerProgressResponse>(`/api/learners/${this.learnerId}/progress`)
      .subscribe((body) => {
        this.courses = body.courses;
        this.state = 'loaded';
      }, () => {
        this.state = 'error';
      });
  }

  onLearnerChange(event: Event): void {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    if (!this.availableLearnerIds.includes(selectedId)) {
      return;
    }

    this.learnerId = selectedId;
    this.loadCourses();
  }
}
