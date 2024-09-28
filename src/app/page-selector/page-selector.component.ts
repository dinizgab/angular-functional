import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'page-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './page-selector.component.html',
  styleUrl: './page-selector.component.css'
})
export class PageSelectorComponent {
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  lastPage: number = 42;

  public onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
