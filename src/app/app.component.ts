import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Issue from '../types/Issue';
import IssueLabel from '../types/IssueLabel';
import Commit from '../types/Commit';
import { IssuesService } from './issue/issue.service';
import { CommitsService } from './commit/commit.service';
import { IssueComponent } from './issue/issue.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { CommitComponent } from './commit/commit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueComponent, LabelDropdownComponent, CommitComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  issues: Issue[] | undefined;
  issues$: Observable<Issue[]>;
  filteredIssues: Issue[] = [];
  uniqueLabels: string[] = [];
  commits: Commit[] | undefined;
  commits$: Observable<Commit[]>;

  private issuesService = inject(IssuesService);
  private commitsService = inject(CommitsService);

  constructor(private http: HttpClient) {
    this.issues$ = this.issuesService.getIssues();
    this.commits$ = this.commitsService.getCommits();
  }

  ngOnInit() {
    this.issues$.subscribe((data) => {
      this.issues = data;
      this.filteredIssues = data;
      this.extractUniqueLabels();
    });

    this.commits$.subscribe((data) => {
      this.commits = data;
      console.log(this.commits);
    });
  }

  private extractUniqueLabels() {
    if (!this.issues) return;

    this.uniqueLabels = this.issues.flatMap(issue => issue.labels)
      .filter((label, index, self) => self.findIndex(l => l.id === label.id) === index)
      .map(label => label.name);

    console.log(this.uniqueLabels);
  }

  onLabelChange(label: string) {
    if (!this.issues) return;

    if (label === '') this.filteredIssues = this.issues;
    else if (label === 'empty') this.filteredIssues = this.issues.filter(issue => issue.labels.length === 0);
    else this.filteredIssues = this.issues.filter(issue => issue.labels.some((l: IssueLabel) => l.name === label));
  }
}
