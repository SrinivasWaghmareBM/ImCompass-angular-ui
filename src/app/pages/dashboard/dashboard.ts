import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StatCardComponent, StatCardData } from '../../shared/stat-card/stat-card';
import { QuickLinkCardComponent, QuickLinkData } from '../../shared/quick-link-card/quick-link-card';
import { recentActivity } from './dashboard-data';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatCardComponent, QuickLinkCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  recentActivity = recentActivity;

  statCards: StatCardData[] = [
    { label: 'Total Policies', value: 156, change: '8 updated this quarter', changeType: 'success' },
    { label: 'Open Queries', value: 12, change: '2 require attention', changeType: 'warning' },
    { label: 'Identified Gaps', value: 23, change: '5 high priority', changeType: 'danger' },
    { label: 'Pending Reviews', value: 7, change: 'Due this month', changeType: 'info' }
  ];

  quickLinks: QuickLinkData[] = [
    { icon: '🔍', title: 'Knowledge & Queries', subtitle: 'Search policies and procedures to find answers', route: 'knowledge-queries' },
    { icon: '⚠️', title: 'Gap Analysis', subtitle: 'Identify and review policy gaps', route: 'gap-analysis' },
    { icon: '📈', title: 'Change Impact', subtitle: 'Assess impact of proposed changes', route: 'change-impact' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
