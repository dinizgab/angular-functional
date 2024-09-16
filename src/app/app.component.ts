import { Component, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Issue from '../types/Issue';
import IssueLabel from '../types/IssueLabel';
import { IssueComponent } from './issue/issue.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)
export class IssuesService {
  issues: Issue[] = [];
  private apiUrl = "https://api.github.com/repos/rails/rails/issues";

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl).pipe(
      map((data: Issue[]) => data.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
        state: item.state,
        number: item.number,
        labels: item.labels.map(label => ({
          ...label,
          rgbaColor: this.convertToRgba(label.color)
        })),
        user: {
          login: item.user.login,
        },
        created_at: item.created_at,
        url: item.url.replace('https://api.github.com/repos', 'https://github.com')
      })))
    );
  }

  private convertToRgba(hex: string, alpha: number = 0.2): string {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueComponent, LabelDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  issues: Issue[] | undefined;
  issues$: Observable<Issue[]>;
  uniqueLabels: string[] = [];

  http = inject(HttpClient);

  constructor(private issuesService: IssuesService) {
    this.issues$ = this.issuesService.getIssues();
  }

  ngOnInit() {
    this.resetIssues();
  }

  private resetIssues() {
    this.issues$.subscribe((data) => {
      this.issues = data;
      this.extractUniqueLabels();
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

    if (label === '') this.resetIssues();
    else if (label === 'empty') this.issues = this.issues.filter(issues => issues.labels.length === 0);
    else this.issues = this.issues.filter(issues => issues.labels.some((l: IssueLabel) => l.name === label));
  }
}
