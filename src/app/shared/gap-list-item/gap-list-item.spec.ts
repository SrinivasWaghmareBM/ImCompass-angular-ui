import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapListItemComponent } from './gap-list-item';

describe('GapListItem', () => {
  let component: GapListItemComponent;
  let fixture: ComponentFixture<GapListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GapListItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('gap', {
      id: 1,
      title: 'Test gap',
      domain: 'compliance',
      severity: 'Medium',
      status: 'Open',
      description: 'This is a test gap description.',
      impact: 'Moderate',
      recommendation: 'Test recommendation',
    });

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
