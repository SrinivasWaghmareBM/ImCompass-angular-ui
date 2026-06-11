import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updatePageTitle(event.url);
    });
  }

  private updatePageTitle(url: string) {
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('knowledge-queries')) this.pageTitle = 'Knowledge & Queries';
    else if (url.includes('gap-analysis')) this.pageTitle = 'Gap Analysis';
    else if (url.includes('change-impact')) this.pageTitle = 'Change Impact';
    else this.pageTitle = 'Dashboard';
  }
}