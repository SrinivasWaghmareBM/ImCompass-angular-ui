import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-followup-card',
  imports: [CommonModule],
  templateUrl: './followup-card.html',
  styleUrl: './followup-card.css'
})
export class FollowupCardComponent {
  followups = input.required<string[]>();
  selected = output<string>();

  onSelect(followup: string) {
    this.selected.emit(followup);
  }
}