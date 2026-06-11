import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer-card',
  imports: [CommonModule],
  templateUrl: './answer-card.html',
  styleUrl: './answer-card.css'
})
export class AnswerCardComponent {
  answer = input.required<string>();
  confidence = input.required<number>();
  clicked = output<void>();

  onExport() {
    this.clicked.emit();
  }
}