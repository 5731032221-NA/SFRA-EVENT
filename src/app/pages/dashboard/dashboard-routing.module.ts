import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DailyComponent as d1} from './daily/daily.component';
// import { DailyComponent as d2} from './dailypdf/daily.component';
// import { DailyComponent as d2} from './dailymock/daily.component';
import { HistoricalComponent} from './historical/historical.component';

import { ExportComponent} from './export/export.component';



const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'daily',
      component: d1,
    },
    {
      path: 'historical',
      component: HistoricalComponent,
    },
    {
      path: 'export',
      component: ExportComponent,
    },
    // {
    //   path: 'pdf',
    //   component: d2,
    // }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  DashboardComponent,
  d1,HistoricalComponent,ExportComponent,
];
