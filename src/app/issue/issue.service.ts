import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Issue from '../../types/Issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
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