import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface QuickLinkData {
  icon: string;
  title: string;
  subtitle: string;
  route: string;
}

@Component({
  selector: 'app-quick-link-card',
  imports: [CommonModule],
  templateUrl: './quick-link-card.html',
  styleUrl: './quick-link-card.css'
})
export class QuickLinkCardComponent {
  data = input.required<QuickLinkData>();
  clicked = output<string>();

  onClick() {
    this.clicked.emit(this.data().route);
  }
}