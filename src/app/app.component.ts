import { Component, inject, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  commits: Commit[] = [];
  filteredCommits: Commit[] = [];
  contributors: { name: string; count: number }[] = [];
  showContributors: boolean = false;
  selectedAuthor: string = '';
  private commitsService = inject(CommitsService);
  
  private loadLimit: number = 10;
  private currentLoad: number = 10;

  ngOnInit() {
    this.loadCommits();
  }

  loadCommits() {
    this.commitsService.getCommits().subscribe((data) => {
      this.commits.push(...data);
      this.applyFilter();
      this.contributors = this.getContributors();
      console.log(this.commits);
    });
  }

  applyFilter() {
    const filtered = this.selectedAuthor
      ? this.commits.filter(commit =>
          commit.author.name.toLowerCase().includes(this.selectedAuthor.toLowerCase())
        )
      : [...this.commits];

    this.filteredCommits = filtered.slice(0, this.currentLoad);
  }

  getContributors(): { name: string; count: number }[] {
    const groupedCommits = groupBy(this.commits, 'author.name');
    return Object.entries(groupedCommits).map(([name, commits]) => ({
      name,
      count: commits.length,
    })).sort((a, b) => b.count - a.count);
  }

  filterCommitsByAuthor() {
    this.applyFilter();
  }

  getLatestsCommitsByAuthor() {
    const ordenarEDistintos = compose(
      (commits: Commit[]) => orderBy(commits, 'date'),
      (commits: Commit[]) => distinct(commits, 'author.name')
    );
  
    this.filteredCommits = ordenarEDistintos(this.commits);
  }

  sortCommitsByDate() {
    this.commits = orderBy(this.commits, 'date');
    this.applyFilter(); 
  }

  sortCommitsByAuthorName() {
    this.commits = orderByName(this.commits, 'author.name');
    this.applyFilter(); 
  }

  toggleContributors() {
    this.showContributors = !this.showContributors;
  }

  loadMoreCommits() {
    this.currentLoad += this.loadLimit;
    this.applyFilter();
  }
}
