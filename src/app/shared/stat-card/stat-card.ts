import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardData } from '../../models';


@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCardComponent {
  data = input.required<StatCardData>();
}