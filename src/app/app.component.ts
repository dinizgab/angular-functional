import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import Commit from '../types/Commit';
import { CommitsService } from './commit/commit.service';
import { CommitComponent } from './commit/commit.component';
import { groupBy, orderBy, orderByName, distinct, compose } from './utils/utils'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommitComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commits: Commit[] | undefined;
  commits$: Observable<Commit[]>;
  filteredCommits: Commit[] | undefined;
  contributors: { name: string; count: number }[] = [];

  showContributors: boolean = false;
  selectedAuthor: string = '';

  private commitsService = inject(CommitsService);

  constructor() {
    this.commits$ = this.commitsService.getCommits();
  }

  ngOnInit() {
    this.commits$.subscribe((data) => {
      this.commits = data;
      this.filteredCommits = this.commits;
      this.contributors = this.getContributors();
      console.log(this.commits);
    });
  }

  getContributors(): { name: string; count: number }[] {
    const groupedCommits = groupBy(this.commits || [], 'author.name');
    const contributors = Object.entries(groupedCommits).map(([name, commits]) => ({
      name,
      count: commits.length,
    }));

    return orderBy(contributors, 'count');
  }

  filterCommitsByAuthor() {
    if (!this.commits) return;

    if (this.selectedAuthor) {
      this.filteredCommits = this.commits.filter(commit =>
        commit.author.name.toLowerCase().includes(this.selectedAuthor.toLowerCase())
      );
    } else {
      this.filteredCommits = this.commits;
    }
  }

  getLatestsCommitsByAuthor() {
    const ordenarEDistintos = compose(
      (commits: Commit[]) => distinct(commits, 'author.name'),
      (commits: Commit[]) => orderBy(commits, 'date')
    );
  
    this.filteredCommits = ordenarEDistintos(this.commits || []);
  }

  sortCommitsByDate() {
    this.commits = orderBy(this.commits || [], 'date');
    this.filteredCommits = this.commits; 
  }

  sortCommitsByAuthorName() {
    this.commits = orderByName(this.commits || [], 'author.name');
    this.filteredCommits = this.commits; 
  }

  toggleContributors() {
    this.showContributors = !this.showContributors;
  }
}
