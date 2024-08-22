import { Component, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Issue from '../types/Issue';

@Injectable(
  { providedIn: 'root' }
)
export class IssuesService {
  issues: Issue[] = [];
  private apiUrl = "https://api.github.com/repos/rails/rails/issues";

  constructor(private http: HttpClient) { }

  getIssues(): void {
    this.http.get<Issue[]>(this.apiUrl).subscribe(data => {
      data.forEach(item => {
        let parsedIssue: Issue = {
          id: item.id,
          title: item.title,
          body: item.body,
          state: item.state,
          number: item.number,
          labels: item.labels,
          user: {
            login: item.user.login
          },
          created_at: item.created_at,
          url: item.url
        }

        this.issues.push(parsedIssue);
      })
    });

    console.log(this.issues);
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gabriel';

  http = inject(HttpClient);

  constructor(private issuesService: IssuesService) { }

  ngOnInit() {
    this.issuesService.getIssues();
  }
}
