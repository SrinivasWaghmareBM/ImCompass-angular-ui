import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalysisComponent } from './gap-analysis';

describe('GapAnalysisComponent', () => {
  let component: GapAnalysisComponent;
  let fixture: ComponentFixture<GapAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapAnalysisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GapAnalysisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
