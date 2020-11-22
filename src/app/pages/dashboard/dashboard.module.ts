import { NgModule } from '@angular/core';
import { NbSelectModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './dashboard-routing.module';
// import { FsIconComponent } from './tree-grid/tree-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { BlobModule } from 'angular-azure-blob-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import {  MatInputModule,MatNativeDateModule, MatDatepickerModule,MatDialogModule, MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import {EmployeeComponent} from './daily/popup/employee/employee.component'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeComponent } from './daily/popup/employee/employee.component';
import { AbsentComponent } from './daily/popup/absent/absent.component';
import { LateComponent } from './daily/popup/late/late.component';
import { OntimeComponent } from './daily/popup/ontime/ontime.component';
import { OvertimeComponent } from './daily/popup/overtime/overtime.component';
// import { IntlModule } from '@progress/kendo-angular-intl';
// import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { EmoComponent } from './daily/popup/emo/emo.component';
// import { BarRatingModule } from "ngx-bar-rating";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
// import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as exportData from 'highcharts/modules/export-data.src';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
export function highchartsModules() {
  return [stock, more,exporting,exportData];
}

@NgModule({
  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    // Ng2SmartTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    // BrowserAnimationsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    // FormsModule,
    // IntlModule, DateInputsModule,
    // BarRatingModule,
    ProgressbarModule,
    // HighchartsChartModule,
    ChartModule,
    NgbModule,
    // EmployeeComponent,
    // BlobModule,
  ],
  declarations: [
    ...routedComponents,
    EmployeeComponent,
    AbsentComponent,
    OntimeComponent,
    LateComponent,
    OvertimeComponent,
    EmoComponent
  ],
  entryComponents: [EmployeeComponent, AbsentComponent,
    OntimeComponent,
    LateComponent,
    OvertimeComponent,
    EmoComponent],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
  ]
})
export class DashboardModule { }
