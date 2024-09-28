import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import Commit from '../types/Commit';
import { CommitsService } from './commit/commit.service';
import { CommitComponent } from './commit/commit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommitComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commits: Commit[] | undefined;
  commits$: Observable<Commit[]>;

  private commitsService = inject(CommitsService);

  constructor() {
    this.commits$ = this.commitsService.getCommits();
  }

  ngOnInit() {
    this.commits$.subscribe((data) => {
      this.commits = data;
      console.log(this.commits);
    });
  }

  // onLabelChange(label: string) {
  //   if (!this.issues) return;

  //   if (label === '') this.filteredIssues = this.issues;
  //   else if (label === 'empty') this.filteredIssues = this.issues.filter(issue => issue.labels.length === 0);
  //   else this.filteredIssues = this.issues.filter(issue => issue.labels.some((l: IssueLabel) => l.name === label));
  // }
}
