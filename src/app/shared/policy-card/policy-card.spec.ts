import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCardComponent } from './policy-card';

describe('PolicyCardComponent', () => {
  let component: PolicyCardComponent;
  let fixture: ComponentFixture<PolicyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyCardComponent);
    component = fixture.componentInstance;
    // provide a minimal required policy input
    component.policy = {
      id: 1,
      title: 'Test Policy',
      version: 'v1.0',
      impact: 'Low',
      description: 'Test',
      date: '2026-01-01',
      affected: [],
      changes: []
    };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
