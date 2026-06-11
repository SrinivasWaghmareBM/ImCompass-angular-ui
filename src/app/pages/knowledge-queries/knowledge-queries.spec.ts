import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeQueriesComponent } from './knowledge-queries';

describe('KnowledgeQueriesComponent', () => {
  let component: KnowledgeQueriesComponent;
  let fixture: ComponentFixture<KnowledgeQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeQueriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnowledgeQueriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
