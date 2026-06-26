import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyCardComponent } from './policy-card';

describe('PolicyCardComponent', () => {
  let component: PolicyCardComponent;
  let fixture: ComponentFixture<PolicyCardComponent>;

  const mockPolicy = {
    id: 1,
    title: 'Test Policy',
    version: 'v1.0',
    description: 'This is a test policy',
    date: '2026-05-28',
    affected: ['Compliance'],
    changes: [
      { type: 'Added' as const, description: 'New section added' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyCardComponent);
    component = fixture.componentInstance;
    component.policy = mockPolicy;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display policy title and version', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Policy v1.0');
  });

  it('should emit toggle event when header is clicked', () => {
    const toggleSpy = vi.spyOn(component.toggle, 'emit');
    const header = fixture.nativeElement.querySelector('.policy-header');
    header.click();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should emit viewFullPolicy event', () => {
    const viewSpy = vi.spyOn(component.viewFullPolicy, 'emit');
    component.onViewFull();
    expect(viewSpy).toHaveBeenCalledWith(mockPolicy);
  });

  it('should emit downloadSummary and generate PDF', () => {
    const downloadSpy = vi.spyOn(component.downloadSummary, 'emit');
    const pdfSpy = vi.spyOn(component as any, 'generatePdf');
    component.onDownload();
    expect(downloadSpy).toHaveBeenCalledWith(mockPolicy);
    expect(pdfSpy).toHaveBeenCalled();
  });

  it('should emit attest event', () => {
    const attestSpy = vi.spyOn(component.attest, 'emit');
    component.onAttest();
    expect(attestSpy).toHaveBeenCalledWith(mockPolicy);
  });

  it('should show "Attested on ..." when attestedAt is provided', () => {
    component.attestedAt = '2026-06-24 10:30';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Attested on 2026-06-24 10:30');
  });

  it('should disable attest button when already attested', () => {
    component.attestedAt = '2026-06-24 10:30';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.btn-secondary:last-child') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
