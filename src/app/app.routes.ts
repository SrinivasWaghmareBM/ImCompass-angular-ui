import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { KnowledgeQueriesComponent } from './pages/knowledge-queries/knowledge-queries';
import { GapAnalysisComponent } from './pages/gap-analysis/gap-analysis';
import { ChangeImpactComponent } from './pages/change-impact/change-impact';

export const routes: Routes = [
  { path: '', redirectTo: '/knowledge-queries', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'knowledge-queries', component: KnowledgeQueriesComponent },
  { path: 'gap-analysis', component: GapAnalysisComponent },
  { path: 'change-impact', component: ChangeImpactComponent },
  { path: '**', redirectTo: '/dashboard' }
];