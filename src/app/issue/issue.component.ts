import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import Issue from '../../types/Issue';


@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export class IssueComponent {
  @Input() issue!: Issue;
}
