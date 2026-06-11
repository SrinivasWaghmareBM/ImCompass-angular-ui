import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapListItem } from './gap-list-item';

describe('GapListItem', () => {
  let component: GapListItem;
  let fixture: ComponentFixture<GapListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(GapListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
