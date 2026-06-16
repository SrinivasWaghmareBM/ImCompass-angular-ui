import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { QuickLinkCardComponent } from './quick-link-card';

describe('QuickLinkCard', () => {
  let component: QuickLinkCardComponent;
  let fixture: ComponentFixture<QuickLinkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickLinkCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickLinkCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      route: '/test-route'
    });

    fixture.detectChanges();  

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
