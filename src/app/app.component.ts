import { Component, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Issue from '../types/Issue';
import { IssueComponent } from './issue/issue.component';
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
        labels: item.labels,
        user: {
          login: item.user.login,
        },
        created_at: item.created_at,
        url: item.url,
      })))
    );
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gabriel';
  selectedIssue: Issue | undefined;
  issues$: Observable<Issue[]>;

  http = inject(HttpClient);

  constructor(private issuesService: IssuesService) {
    this.issues$ = this.issuesService.getIssues();
  }

  ngOnInit() {
    this.issuesService.getIssues();

    this.issues$.subscribe((issues) => {
      if (issues.length > 0) {
        this.selectedIssue = issues[0];
      }
    })
  }
}
