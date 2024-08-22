import { Component, Input } from '@angular/core';
import Issue from '../../types/Issue';


@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export class IssueComponent {
  @Input() issue!: Issue;
}
