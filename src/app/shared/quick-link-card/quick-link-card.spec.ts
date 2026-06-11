import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLinkCard } from './quick-link-card';

describe('QuickLinkCard', () => {
  let component: QuickLinkCard;
  let fixture: ComponentFixture<QuickLinkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickLinkCard],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickLinkCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
