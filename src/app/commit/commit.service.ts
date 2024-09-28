import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Commit from '../../types/Commit';

@Injectable({ providedIn: 'root' })
export class CommitsService {
  private apiUrl = "https://api.github.com/repos/rails/rails/commits";

  constructor(private http: HttpClient) {}

  getCommits(): Observable<Commit[]> {
    return this.http.get<Commit[]>(this.apiUrl).pipe(
      map((data: any[]) => data.map((item) => ({
        sha: item.sha,
        message: item.commit.message,
        author: {
          name: item.commit.author.name,
        },
        date: item.commit.author.date,
        url: item.html_url
      })))
    );
  }
}
