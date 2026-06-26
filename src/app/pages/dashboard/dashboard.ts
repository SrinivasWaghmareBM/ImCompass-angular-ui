import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StatCardData, QuickLinkData } from '../../models';
import { StatCardComponent } from '../../shared/stat-card/stat-card';
import { QuickLinkCardComponent} from '../../shared/quick-link-card/quick-link-card';
import { recentActivity } from './dashboard-data';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatCardComponent, QuickLinkCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  recentActivity = recentActivity;

  statCards: StatCardData[] = [
    { label: 'Total Policies', value: 86 },
    { label: 'Identified Gaps', value: 11 },
  ];

  quickLinks: QuickLinkData[] = [
    {
      icon: '🔍',
      title: 'Knowledge & Queries',
      subtitle: 'Search policies and procedures to find answers',
      route: 'knowledge-queries',
    },
    {
      icon: '⚠️',
      title: 'Gap Analysis',
      subtitle: 'Identify and review policy gaps',
      route: 'gap-analysis',
    },
    {
      icon: '📈',
      title: 'Change Impact',
      subtitle: 'Assess impact of proposed changes',
      route: 'change-impact',
    },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
