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
    if (this.selectedAuthor) {
      this.filteredCommits = this.commits.filter(commit =>
        commit.author.name.toLowerCase().includes(this.selectedAuthor.toLowerCase())
      );
    } else {
      this.filteredCommits = [...this.commits];
    }
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
      (commits: Commit[]) => distinct(commits, 'author.name'),
      (commits: Commit[]) => orderBy(commits, 'date')
    );
  
    this.filteredCommits = ordenarEDistintos(this.commits);
  }

  sortCommitsByDate() {
    this.commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.applyFilter(); 
  }

  sortCommitsByAuthorName() {
    this.commits.sort((a, b) => a.author.name.localeCompare(b.author.name));
    this.applyFilter(); 
  }

  toggleContributors() {
    this.showContributors = !this.showContributors;
  }
}
