import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'label-dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './label-dropdown.component.html',
  styleUrl: './label-dropdown.component.css'
})
export class LabelDropdownComponent {
  @Input() labels: string[] = [];
  @Output() labelChange = new EventEmitter<string>();
  selectedLabel: string = '';

  public onLabelChange(event: any): void {
    this.labelChange.emit(event.target.value);
  }
}
