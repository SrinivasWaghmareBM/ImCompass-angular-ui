import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextAction } from '../../models';

@Component({
  selector: 'app-next-actions-card',
  imports: [CommonModule],
  templateUrl: './next-actions-card.html',
  styleUrl: './next-actions-card.css'
})
export class NextActionsCardComponent {
  actions = input.required<NextAction[]>();
  
  // Track which actions are expanded (by index)
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