import { Component, Input } from '@angular/core';
import Commit from '../../types/Commit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./commit.component.css']
})
export class CommitComponent {
  @Input() commit!: Commit;
}