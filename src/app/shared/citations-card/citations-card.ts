import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Citation } from '../../models';

@Component({
  selector: 'app-citations-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citations-card.html',
  styleUrls: ['./citations-card.css']
})
export class CitationsCardComponent {
  citations = input.required<Citation[]>();
  
  // Track which citations are expanded (by index)
  expandedItems = signal<Set<number>>(new Set());

  toggleExpand(index: number) {
    const current = new Set(this.expandedItems());
    if (current.has(index)) {
      current.delete(index);
    } else {
      current.add(index);
    }
    this.expandedItems.set(current);
  }

  isExpanded(index: number): boolean {
    return this.expandedItems().has(index);
  }
}