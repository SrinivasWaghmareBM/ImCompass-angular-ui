import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gapStats, gaps, queryGapStats, queryGapItems, queryGapDetails, QueryGapItem, QueryGapDetail } from './gap-analysis-data';
import { Gap } from '../../models';

@Component({
  selector: 'app-gap-analysis',
  imports: [CommonModule],
  templateUrl: './gap-analysis.html',
  styleUrl: './gap-analysis.css'
})
export class GapAnalysisComponent {
  
  gapStats = gapStats;
  gaps = gaps;
  queryGapStats = queryGapStats;
  queryGapItems = queryGapItems;
  
  selectedGap = signal<Gap | null>(null);
  selectedQueryGap = signal<QueryGapDetail | null>(null);
  activeFilter = signal<'all' | 'high' | 'open' | 'in-review'>('all');

  filteredGaps = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.gaps;
    if (filter === 'high') return this.gaps.filter(g => g.severity === 'High');
    if (filter === 'open') return this.gaps.filter(g => g.status.toLowerCase() === 'open');
    if (filter === 'in-review') return this.gaps.filter(g => g.status.toLowerCase() === 'in review');
    return this.gaps;
  });

  selectGap(gap: Gap) {
    this.selectedGap.set(gap);
    this.selectedQueryGap.set(null);
  }

  selectQueryGap(query: QueryGapItem) {
    const detail = queryGapDetails.find(d => d.query === query.query);
    if (detail) {
      this.selectedQueryGap.set(detail);
      this.selectedGap.set(null);
    }
  }

  setFilter(filter: 'all' | 'high' | 'open' | 'in-review') {
    this.activeFilter.set(filter);
  }

  getSeverityClass(severity: string): string {
    if (severity === 'High') return 'severity-badge high';
    if (severity === 'Medium') return 'severity-badge medium';
    return 'severity-badge low';
  }

  getStatusClass(status: string): string {
    if (status.toLowerCase() === 'open') return 'open';
    if (status.toLowerCase() === 'in review') return 'in-review';
    return '';
  }

  getRiskClass(riskLevel: string): string {
    if (riskLevel === 'Risk & Controls') return 'risk-controls';
    if (riskLevel === 'ESG & Stewardship') return 'esg-stewardship';
    if (riskLevel === 'Operations & Technology') return 'operations-tech';
    if (riskLevel === 'Client Account Management') return 'client-account';
    return '';
  }

  closeDetail() {
    this.selectedGap.set(null);
  }

  closeQueryDetail() {
    this.selectedQueryGap.set(null);
  }
}