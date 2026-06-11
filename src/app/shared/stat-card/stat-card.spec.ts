import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent, StatCardData } from './stat-card';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    
    // Set required input
    const mockData: StatCardData = {
      label: 'Test Label',
      value: 100,
      change: 'Test change',
      changeType: 'success'
    };
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
