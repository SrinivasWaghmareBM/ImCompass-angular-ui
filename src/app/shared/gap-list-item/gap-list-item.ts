import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gap } from '../../models';

@Component({
  selector: 'app-gap-list-item',
  imports: [CommonModule],
  templateUrl: './gap-list-item.html',
  styleUrl: './gap-list-item.css'
})
export class GapListItemComponent {
  gap = input.required<Gap>();
  selected = input<boolean>(false);
  clicked = output<Gap>();

  onClick() {
    this.clicked.emit(this.gap());
  }

  getSeverityClass(severity: string): string {
    if (severity === 'High') return 'severity-badge high';
    if (severity === 'Medium') return 'severity-badge medium';
    return 'severity-badge low';
  }
}