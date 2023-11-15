import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { InterviewsService } from '../../services/interviews.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';
import { SortTableInterviewComponent } from "../../../../core/components/sort-table-interviews/sort-table-interview.component";

@Component({
    selector: 'app-interviews',
    standalone: true,
    providers: [InterviewsService],
    templateUrl: './interviews.component.html',
    styleUrls: ['./interviews.component.scss'],
    imports: [CommonModule, LanguageModule, SortTableComponent, UiModule, SortTableInterviewComponent]
})
export class InterviewsComponent implements OnInit {
  interviewsService = inject(InterviewsService);
  createdInterview!: string | null;
  successCreate = false;
  interviews!: any[];
  successCreateInterview!: string | null;
  
  ngOnInit(): void {
    this.getInterviews();
    this.setSuccessCreated();
  }

  getInterviews() {
    this.interviewsService
      .getInterviews()
      .pipe(
        tap((interviews) => {
          interviews.forEach((interviews: any) => {
            interviews.profiles = [];
          });

          this.interviews = interviews;
        })
      )
      .subscribe();
  }

  setSuccessCreated() {
    this.createdInterview = localStorage.getItem(Keys.CREATE_INTERVIEW_COMPLETE);

    if (this.createdInterview) {
      this.successCreate = true;

      setTimeout(() => (this.successCreate = false), 3000);
      localStorage.removeItem(Keys.CREATE_INTERVIEW_COMPLETE);
    }
  }
}
