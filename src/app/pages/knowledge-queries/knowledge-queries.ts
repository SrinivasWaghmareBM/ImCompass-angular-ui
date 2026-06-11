import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnswerCardComponent } from '../../shared/answer-card/answer-card';
import { CitationsCardComponent } from '../../shared/citations-card/citations-card';
import { FollowupCardComponent } from '../../shared/followup-card/followup-card';
import { NextActionsCardComponent } from '../../shared/next-actions-card/next-actions-card';
import { 
  defaultAnswer, 
  citations, 
  suggestedFollowUps, 
  nextActions,
  domainOptions,
  regionOptions,
  docTypeOptions,
  updateFreqOptions,
  dateRangeOptions
} from './knowledge-queries-data';

@Component({
  selector: 'app-knowledge-queries',
  imports: [CommonModule, FormsModule, AnswerCardComponent, CitationsCardComponent, FollowupCardComponent, NextActionsCardComponent],
  templateUrl: './knowledge-queries.html',
  styleUrl: './knowledge-queries.css'
})
export class KnowledgeQueriesComponent {
  searchQuery = signal('');
  hasSearched = signal(false);
  confidenceScore = signal(94);
  searchResults = signal<any[]>([]);
  activeFilterDropdown = signal<string | null>(null);

  // Filter options from data file
  domainOptionsList = domainOptions;
  regionOptionsList = regionOptions;
  docTypeOptionsList = docTypeOptions;
  updateFreqOptionsList = updateFreqOptions;
  dateRangeOptionsList = dateRangeOptions;

  selectedFilters = signal({
    domain: 'All Domains',
    region: 'All Regions',
    docType: 'All Types',
    updateFreq: 'All Frequencies',
    dateRange: 'Last 30 days'
  });

  // Data from data file
  answerText = signal(defaultAnswer);
  citationsList = signal(citations);
  suggestedFollowUpsList = signal(suggestedFollowUps);
  nextActionsList = signal(nextActions);

  hasResults = computed(() => this.searchResults().length > 0);

  // Check if any filter is active (not at default value)
  hasActiveFilters = computed(() => {
    const filters = this.selectedFilters();
    return filters.domain !== 'All Domains' ||
           filters.region !== 'All Regions' ||
           filters.docType !== 'All Types' ||
           filters.updateFreq !== 'All Frequencies' ||
           filters.dateRange !== 'Last 30 days';
  });

  toggleFilterDropdown(filterType: string) {
    if (this.activeFilterDropdown() === filterType) {
      this.activeFilterDropdown.set(null);
    } else {
      this.activeFilterDropdown.set(filterType);
    }
  }

  selectFilterOption(filterType: string, option: string) {
    const current = this.selectedFilters();
    this.selectedFilters.set({ ...current, [filterType]: option });
    this.activeFilterDropdown.set(null);
  }

  clearSingleFilter(filterType: 'domain' | 'region' | 'docType' | 'updateFreq' | 'dateRange') {
    const current = this.selectedFilters();
    const defaults = {
      domain: 'All Domains',
      region: 'All Regions',
      docType: 'All Types',
      updateFreq: 'All Frequencies',
      dateRange: 'Last 30 days'
    };
    this.selectedFilters.set({ ...current, [filterType]: defaults[filterType] });
  }

  clearAllFilters() {
    this.selectedFilters.set({
      domain: 'All Domains',
      region: 'All Regions',
      docType: 'All Types',
      updateFreq: 'All Frequencies',
      dateRange: 'Last 30 days'
    });
  }

  performSearch() {
    const query = this.searchQuery().trim();
    if (query) {
      this.hasSearched.set(true);
      this.searchResults.set([1]);
    }
  }

  selectFollowUp(question: string) {
    this.searchQuery.set(question);
    this.performSearch();
  }

  clearSearch() {
    this.searchQuery.set('');
    this.hasSearched.set(false);
    this.searchResults.set([]);
  }

  clearSearchInput() {
    this.searchQuery.set('');
  }

  onExportAnswer() {
    console.log('Exporting answer...');
  }

  onFollowupSelected(followup: string) {
    this.selectFollowUp(followup);
  }
}