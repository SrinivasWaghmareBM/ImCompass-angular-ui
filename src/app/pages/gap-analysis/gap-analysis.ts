import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GapListItemComponent } from '../../shared/gap-list-item/gap-list-item';
import { gapStats, gaps } from './gap-analysis-data';
import { Gap } from '../../models';

@Component({
  selector: 'app-gap-analysis',
  imports: [CommonModule, FormsModule, GapListItemComponent],
  templateUrl: './gap-analysis.html',
  styleUrl: './gap-analysis.css'
})
export class GapAnalysisComponent {
  
  gapStats = gapStats;
  gaps = gaps;
  
  selectedGap = signal<Gap | null>(null);

  // ==================== FILTERS ====================
  searchQuery = signal('');
  selectedSeverity = signal('All');
  selectedStatus = signal('All');
  selectedDomain = signal('All');
  selectedDateFilter = signal('Date Last Updated');

  // Unique values for dropdowns
  severities = ['All', ...new Set(gaps.map(g => g.severity))];
  statuses = ['All', ...new Set(gaps.map(g => g.status))];
  domains = ['All', ...new Set(gaps.map(g => g.domain))];
  dateOptions = ['Date Last Updated', 'Past 30 Days', 'Past 60 Days', 'Past 90 Days', 'Past Year'];

  // Filtered Gaps
  filteredGaps = computed(() => {
    const search = this.searchQuery().toLowerCase();
    const severity = this.selectedSeverity();
    const status = this.selectedStatus();
    const domain = this.selectedDomain();
    const dateFilter = this.selectedDateFilter();

    return this.gaps.filter(gap => {
      const matchesSearch = !search || 
        gap.title.toLowerCase().includes(search) ||
        gap.description.toLowerCase().includes(search);

      const matchesSeverity = severity === 'All' || gap.severity === severity;
      const matchesStatus = status === 'All' || gap.status.toLowerCase() === status.toLowerCase();
      const matchesDomain = domain === 'All' || gap.domain === domain;

      let matchesDate = true;

      return matchesSearch && matchesSeverity && matchesStatus && matchesDomain && matchesDate;
    });
  });

  hasActiveFilters(): boolean {
    return this.searchQuery() !== '' ||
           this.selectedSeverity() !== 'All' ||
           this.selectedStatus() !== 'All' ||
           this.selectedDomain() !== 'All' ||
           this.selectedDateFilter() !== 'Date Last Updated';
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedSeverity.set('All');
    this.selectedStatus.set('All');
    this.selectedDomain.set('All');
    this.selectedDateFilter.set('Date Last Updated');
  }

  selectGap(gap: Gap) {
    this.selectedGap.set(gap);
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

  closeDetail() {
    this.selectedGap.set(null);
  }

  
  constructor() {
    // Auto-select first gap when filtered list changes
    effect(() => {
      const list = this.filteredGaps();
      if (list.length > 0 && !this.selectedGap()) {
        this.selectedGap.set(list[0]);
      }
    });
  }


  // Export current gap as PDF (same pattern as Change Impact)
  exportGap() {
    const gap = this.selectedGap();
    if (!gap) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>${gap.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #334155; }
            h1 { color: #1e40af; margin-bottom: 8px; }
            .meta { color: #64748b; margin-bottom: 24px; }
            .section { margin-bottom: 24px; }
            .section-title { font-weight: 600; color: #0f172a; margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <h1>${gap.title}</h1>
          <div class="meta">
            <strong>Domain:</strong> ${gap.domain}<br>
            <strong>Severity:</strong> ${gap.severity}<br>
            <strong>Status:</strong> ${gap.status}
          </div>

          <div class="section">
            <div class="section-title">Description</div>
            <p>${gap.description}</p>
          </div>

          <div class="section">
            <div class="section-title">Impact</div>
            <p>${gap.impact}</p>
          </div>

          <div class="section">
            <div class="section-title">Recommendation</div>
            <p>${gap.recommendation}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
}
