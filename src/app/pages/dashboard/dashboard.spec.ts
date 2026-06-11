import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { StatCardComponent } from '../../shared/stat-card/stat-card';
import { QuickLinkCardComponent } from '../../shared/quick-link-card/quick-link-card';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, StatCardComponent, QuickLinkCardComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 stat cards', () => {
    expect(component.statCards.length).toBe(4);
  });

  it('should have 3 quick links', () => {
    expect(component.quickLinks.length).toBe(3);
  });

  it('should navigate when navigateTo is called', () => {
    component.navigateTo('knowledge-queries');
    expect(router.navigate).toHaveBeenCalledWith(['knowledge-queries']);
  });
});
