import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationsCard } from './citations-card';

describe('CitationsCard', () => {
  let component: CitationsCard;
  let fixture: ComponentFixture<CitationsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitationsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CitationsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
