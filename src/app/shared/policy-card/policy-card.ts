import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy } from '../../models';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-card.html',
  styleUrls: ['./policy-card.css']
})
export class PolicyCardComponent {

  @Input() policy!: Policy;

  get impactClass(): string {
    const impact = this.policy.impact;
    if (impact === 'High') return 'impact-badge high';
    if (impact === 'Medium') return 'impact-badge medium';
    return 'impact-badge low';
  }

  getChangeClass(type: string): string {
    if (type === 'Added') return 'added';
    if (type === 'Modified') return 'modified';
    return 'removed';
  }
}