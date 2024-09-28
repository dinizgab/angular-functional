import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Issue from '../types/Issue';
import { IssueComponent } from './issue/issue.component';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { AsyncPipe } from '@angular/common';

@Injectable(
  { providedIn: 'root' }
)
export class IssuesService {
  issues: Issue[] = [];
  private currentPage;
  private apiUrl;

  constructor(private http: HttpClient) {
    this.currentPage = 1;
    this.apiUrl = `https://api.github.com/repos/rails/rails/issues?per_page=100&page=${this.currentPage}`;
  }

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
        comments: item.comments,
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

  setPage(page: number) {
    this.currentPage = page;
    this.apiUrl = `https://api.github.com/repos/rails/rails/issues?page=${this.currentPage}`;
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueComponent, LabelDropdownComponent, FormsModule, PageSelectorComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  issues$: Observable<Issue[]>;
  uniqueLabels: string[] = [];
  showOpen: boolean = false;
  orderByComments: boolean = false;
  orderByCreatedDate: boolean = false;
  selectedLabel: string = '';
  currentPage: number = 1;

  http = inject(HttpClient);

  constructor(private issuesService: IssuesService) {
    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data))
    );

    console.log(this.issues$);
  }

  ngOnInit() {
    this.issues$.subscribe((data) => {
      this.extractUniqueLabels(data)
    });
  }

  private extractUniqueLabels(issues: Issue[]) {
    this.uniqueLabels = issues.flatMap(issue => issue.labels)
      .filter((label, index, self) => self.findIndex(l => l.id === label.id) === index)
      .map(label => label.name);
  }

  onLabelChange(label: string) {
    this.selectedLabel = label;
    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data.filter(issue => {
        if (label === '') return true;
        if (label === 'empty') return issue.labels.length === 0;
        return issue.labels.some(l => l.name === label);
      })))
    );
  }

  toggleOpenIssuesFilter(e: any) {
    this.showOpen = e.target.checked;
    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data))
    );
  }

  toggleOrderByComments(e: any) {
    this.orderByComments = e.target.checked;
    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data))
    );
  }

  toggleOrderByCreatedDate(e: any) {
    this.orderByCreatedDate = e.target.checked;
    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data))
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.issuesService.setPage(page);

    this.issues$ = this.issuesService.getIssues().pipe(
      map((data) => this.applyFilters(data))
    );
  }

  applyFilters(issues: Issue[]): Issue[] {
    let filtered = [...issues];

    if (this.showOpen) {
      filtered = filtered.filter(issue => issue.state === 'open');
    }

    if (this.orderByComments && this.orderByCreatedDate) {
      filtered.sort((a, b) => {
        if (a.comments === b.comments) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return b.comments - a.comments;
      });
    } else if (this.orderByComments) {
      filtered.sort((a, b) => b.comments - a.comments);
    } else if (this.orderByCreatedDate) {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }
}
