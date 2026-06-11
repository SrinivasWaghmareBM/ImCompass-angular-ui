import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatCardData {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'success' | 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCardComponent {
  data = input.required<StatCardData>();
}