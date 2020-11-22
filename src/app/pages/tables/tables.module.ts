import { NgModule } from '@angular/core';
import {NbSelectModule,NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './inserttable/inserttable.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { BlobModule } from 'angular-azure-blob-service';
import {NgxPaginationModule} from 'ngx-pagination';
import {EditTableComponent} from './edittable/edittable.component'
import {DeletetableTableComponent} from './deletetable/deletetable.component'
import {AttendanceComponent} from './attendance/attendance.component'
import {EditComponent} from './edit/edit.component'
import { MatDialogModule } from '@angular/material';
import { NgxSpinnerModule } from "ngx-spinner";

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
    MatDialogModule,
    NgxSpinnerModule,
    // BlobModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    EditTableComponent,
    DeletetableTableComponent,
    AttendanceComponent,
    EditComponent,
  ],
  entryComponents: [EditTableComponent,DeletetableTableComponent,AttendanceComponent,EditComponent],
})
export class TablesModule { }
