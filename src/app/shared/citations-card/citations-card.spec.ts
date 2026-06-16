import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationsCardComponent } from './citations-card';

describe('CitationsCard', () => {
  let component: CitationsCardComponent;
  let fixture: ComponentFixture<CitationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitationsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitationsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('citations', [
          {
            type: 'POL',
            title: 'overdrafts_policy.pdf',
            page: 7,
            date: new Date('01-01-2025'),
            snippet: 'ISA and SIPPs accounts must maintain positive balances...',
            sourceUrl: 'https://example.com/overdrafts_policy.pdf',
          }]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
