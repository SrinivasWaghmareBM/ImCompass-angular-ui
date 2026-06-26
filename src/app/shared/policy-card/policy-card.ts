import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy } from '../../models';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-card.html',
  styleUrls: ['./policy-card.css']
})
export class PolicyCardComponent {

  @Input() policy!: Policy;
  @Input() isExpanded = false;
  @Input() attestedAt: Date | string | null = null;   // Accept Date or string

  @Output() toggle = new EventEmitter<void>();
  @Output() viewFullPolicy = new EventEmitter<Policy>();
  @Output() downloadSummary = new EventEmitter<Policy>();
  @Output() attest = new EventEmitter<Policy>();

  getChangeClass(type: string): string {
    if (type === 'Added') return 'added';
    if (type === 'Modified') return 'modified';
    return 'removed';
  }

  onToggle() {
    this.toggle.emit();
  }

  onViewFull() {
    this.viewFullPolicy.emit(this.policy);
  }

  onDownload() {
    this.downloadSummary.emit(this.policy);
    this.generatePdf();
  }

  onAttest() {
    this.attest.emit(this.policy);
  }

  private generatePdf() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>${this.policy.title} ${this.policy.version}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #334155; }
            h1 { color: #1e40af; margin-bottom: 8px; }
            .meta { color: #64748b; margin-bottom: 24px; }
            .change { margin-bottom: 12px; padding: 12px; background: #f8fafc; border-radius: 6px; }
            .change-type { font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>${this.policy.title} ${this.policy.version}</h1>
          <div class="meta">
            <strong>Date:</strong> ${ this.policy.date } <br>
            <strong>Affected Areas:</strong> ${this.policy.affected.join(', ')}
          </div>
          <p>${this.policy.description}</p>

          <h3>Policy Changes</h3>
          ${this.policy.changes?.map(change => `
            <div class="change">
              <span class="change-type">${change.type}:</span> ${change.description}
            </div>
          `).join('') || '<p>No changes recorded.</p>'}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
}
