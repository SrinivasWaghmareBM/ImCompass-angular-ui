import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PolicyCardComponent } from '../../shared/policy-card/policy-card';
import { Policy } from '../../models';
import { samplePolicies } from './change-impact-data';

@Component({
  selector: 'app-change-impact',
  standalone: true,
  imports: [CommonModule, FormsModule, PolicyCardComponent],
  templateUrl: './change-impact.html',
  styleUrl: './change-impact.css'
})
export class ChangeImpactComponent {

  private http = inject(HttpClient);

  searchQuery = signal('');
  selectedTimeFilter = signal('all');
  selectedDomainFilter = signal('All');

  expandedPolicies = signal<Set<number>>(new Set());
  attestedPolicies = signal<Map<number, string>>(new Map());

  policies: Policy[] = samplePolicies;
  filteredPolicies = signal(this.policies);

  constructor() {
    this.applyFilters();
  }

  // Check if any filter is active
  hasActiveFilters(): boolean {
    return this.searchQuery() !== '' ||
           this.selectedTimeFilter() !== 'all' ||
           this.selectedDomainFilter() !== 'All';
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedTimeFilter.set('all');
    this.selectedDomainFilter.set('All');
    this.applyFilters();
  }

  applyFilters() {
    const query = this.searchQuery().toLowerCase();
    const timeFilter = this.selectedTimeFilter();
    const areaFilter = this.selectedDomainFilter();

    const today = new Date();

    let result = this.policies;

    // Search filter
    if (query) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Date filter
    if (timeFilter !== 'all') {
      const daysFilter = parseInt(timeFilter, 10);
      if (!isNaN(daysFilter)) {
        result = result.filter(policy => {
          const policyDate = new Date(policy.date);
          const diffTime = Math.abs(today.getTime() - policyDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= daysFilter;
        });
      }
    }

    // Area filter
    if (areaFilter !== 'All') {
      result = result.filter(p =>
        p.affected.some(area => area.toLowerCase().includes(areaFilter.toLowerCase()))
      );
    }

    this.filteredPolicies.set(result);
  }

  togglePolicy(id: number) {
    const current = new Set(this.expandedPolicies());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedPolicies.set(current);
  }

  isExpanded(id: number): boolean {
    return this.expandedPolicies().has(id);
  }

  getAttestedAt(policyId: number): string | null {
    return this.attestedPolicies().get(policyId) || null;
  }

  // ==================== EVENT HANDLERS ====================

  onViewFullPolicy(policy: Policy) {
    const documentUrl = `/api/policies/${policy.id}/document`;
    window.open(documentUrl, '_blank');
  }

  onDownloadSummary(policy: Policy) {
    console.log('Download triggered for:', policy.title);
  }

  async onAttest(policy: Policy) {
    const userId = 'user_12345';
    const impactId = policy.id;

    try {
      // await this.http.post('/api/attest', {
      //   impactId: impactId,
      //   userId: userId
      // }).toPromise();

      const attestedTime = new Date().toLocaleString();
      const currentAttested = new Map(this.attestedPolicies());
      currentAttested.set(policy.id, attestedTime);
      this.attestedPolicies.set(currentAttested);
    } catch (error) {
      console.error('Failed to attest policy:', error);
      alert('Failed to record attestation. Please try again.');
    }
  }

  onSearchChange() {
    this.applyFilters();
  }

  onTimeFilterChange(value: string) {
    this.selectedTimeFilter.set(value);
    this.applyFilters();
  }

  onDomainFilterChange(value: string) {
    this.selectedDomainFilter.set(value);
    this.applyFilters();
  }
}
