import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GapAnalysisComponent } from './gap-analysis';

describe('GapAnalysisComponent', () => {
  let component: GapAnalysisComponent;
  let fixture: ComponentFixture<GapAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapAnalysisComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GapAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by search query', () => {
    component.searchQuery.set('proxy');
    fixture.detectChanges();
    expect(component.filteredGaps().length).toBeGreaterThan(0);
  });

  it('should filter by severity', () => {
    component.selectedSeverity.set('High');
    fixture.detectChanges();
    const result = component.filteredGaps();
    expect(result.every(g => g.severity === 'High')).toBe(true);
  });

  it('should filter by status', () => {
    component.selectedStatus.set('Open');
    fixture.detectChanges();
    const result = component.filteredGaps();
    expect(result.every(g => g.status.toLowerCase() === 'open')).toBe(true);
  });

  it('should filter by domain', () => {
    component.selectedDomain.set('Compliance');
    fixture.detectChanges();
    const result = component.filteredGaps();
    expect(result.every(g => g.domain === 'Compliance')).toBe(true);
  });

  it('should clear all filters', () => {
    component.searchQuery.set('test');
    component.selectedSeverity.set('High');
    component.selectedStatus.set('Open');
    component.selectedDomain.set('Compliance');

    component.clearFilters();
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('');
    expect(component.selectedSeverity()).toBe('All');
    expect(component.selectedStatus()).toBe('All');
    expect(component.selectedDomain()).toBe('All');
  });

  it('should return all gaps when no filters are applied', () => {
    component.clearFilters();
    fixture.detectChanges();
    expect(component.filteredGaps().length).toBe(component.gaps.length);
  });
});
