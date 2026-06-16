import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyCardComponent } from '../../shared/policy-card/policy-card';
import { policies } from './change-impact-data';

@Component({
  selector: 'app-change-impact',
  imports: [CommonModule],
  templateUrl: './change-impact.html',
  styleUrl: './change-impact.css'
})
export class ChangeImpactComponent {
  allPolicies = policies;
  
  // Filter selections
  selectedTimePeriod = signal('Last 30 Days');
  selectedImpactLevel = signal('All Impact Levels');
  selectedArea = signal('All Areas');
  
  // Active dropdown
  activeDropdown = signal<string | null>(null);
  
  // Accordion: only one policy open at a time
  expandedPolicyId = signal<number | null>(null);

  // Filter options
  timePeriodOptions = ['Last 30 Days', 'Last 90 Days', 'Last 6 Months', 'Last Year', 'All Time'];
  impactLevelOptions = ['All Impact Levels', 'High Impact', 'Medium Impact', 'Low Impact'];
  areaOptions = ['All Areas', 'Trading Desk', 'Portfolio Management', 'Compliance', 'Operations'];

  // Filtered policies
  filteredPolicies = computed(() => {
    let result = this.allPolicies;

    // Filter by impact level
    const impact = this.selectedImpactLevel();
    if (impact !== 'All Impact Levels') {
      const level = impact.replace(' Impact', '');
      result = result.filter(p => p.impact === level);
    }

    // Filter by area
    const area = this.selectedArea();
    if (area !== 'All Areas') {
      result = result.filter(p => p.affected.includes(area));
    }

    return result;
  });

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown() === dropdown) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(dropdown);
    }
  }

  selectTimePeriod(option: string) {
    this.selectedTimePeriod.set(option);
    this.activeDropdown.set(null);
  }

  selectImpactLevel(option: string) {
    this.selectedImpactLevel.set(option);
    this.activeDropdown.set(null);
  }

  selectArea(option: string) {
    this.selectedArea.set(option);
    this.activeDropdown.set(null);
  }

  togglePolicy(policyId: number) {
    if (this.expandedPolicyId() === policyId) {
      this.expandedPolicyId.set(null);
    } else {
      this.expandedPolicyId.set(policyId);
    }
  }

  isPolicyExpanded(policyId: number): boolean {
    return this.expandedPolicyId() === policyId;
  }

  getImpactClass(impact: string): string {
    if (impact === 'High') return 'impact-badge high';
    if (impact === 'Medium') return 'impact-badge medium';
    return 'impact-badge low';
  }

  getChangeClass(type: string): string {
    if (type === 'Added') return 'added';
    if (type === 'Modified') return 'modified';
    return 'removed';
  }

  clearAllFilters() {
    this.selectedTimePeriod.set('Last 30 Days');
    this.selectedImpactLevel.set('All Impact Levels');
    this.selectedArea.set('All Areas');
  }
}