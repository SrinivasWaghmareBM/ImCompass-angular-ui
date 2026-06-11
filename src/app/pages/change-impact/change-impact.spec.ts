import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImpactComponent } from './change-impact';

describe('ChangeImpactComponent', () => {
  let component: ChangeImpactComponent;
  let fixture: ComponentFixture<ChangeImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeImpactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeImpactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
