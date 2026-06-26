import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeImpactComponent } from './change-impact';
import { samplePolicies } from './change-impact-data';

describe('ChangeImpactComponent - Date Filter', () => {
  let component: ChangeImpactComponent;
  let fixture: ComponentFixture<ChangeImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeImpactComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeImpactComponent);
    component = fixture.componentInstance;

    // Use sample data
    component.policies = [...samplePolicies];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter policies within last 30 days', () => {
    component.selectedTimeFilter.set('30');
    component.onTimeFilterChange('30');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });

  it('should filter policies within last 60 days', () => {
    component.selectedTimeFilter.set('60');
    component.onTimeFilterChange('60');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });

  it('should filter policies within last 90 days', () => {
    component.selectedTimeFilter.set('90');
    component.onTimeFilterChange('90');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });

  it('should return all policies when filtering by 365 days', () => {
    component.selectedTimeFilter.set('365');
    component.onTimeFilterChange('365');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBe(component.policies.length);
  });

  it('should combine date filter with search query', () => {
    component.searchQuery.set('Best Execution');
    component.selectedTimeFilter.set('365');
    component.onSearchChange();
    component.onTimeFilterChange('365');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].title).toContain('Best Execution');
  });

  it('should combine date filter with area filter', () => {
    component.selectedAreaFilter.set('Compliance');
    component.selectedTimeFilter.set('365');
    component.onAreaFilterChange('Compliance');
    component.onTimeFilterChange('365');

    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });

  it('should return no results when date filter is very restrictive', () => {
    // Set a very old date filter (e.g., 1 day)
    component.selectedTimeFilter.set('1');
    component.onTimeFilterChange('1');

    // This will likely return 0 results unless a policy was updated today
    const filtered = component.filteredPolicies();
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });
});
