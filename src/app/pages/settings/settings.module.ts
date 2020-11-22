import { NgModule } from '@angular/core';
import {NbSelectModule,NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { settingsRoutingModule, routedComponents } from './settings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { BlobModule } from 'angular-azure-blob-service';
import {NgxPaginationModule} from 'ngx-pagination';
import {AccountManagementComponent} from './accountmanagement/accountmanagement.component';
import {  NotificationComponent} from './notification/notification.component';

import { MatDialogModule } from '@angular/material';
import {DeleteAccountComponent} from './deleteaccount/deleteaccount.component';
import {DeleteNNotificationComponent} from './deletenotification/deletenotification.component';

import {DeleteAlertComponent} from './deletealert/deletealert.component';
import {SignupComponent} from './signup/signup.component';
import {ResetAccountComponent} from './resetaccount/resetaccount.component';

import {AddnotiComponent} from './addnoti/addnoti.component';

@NgModule({
  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    settingsRoutingModule,
    // Ng2SmartTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    // BlobModule,
  ],
  declarations: [
    ...routedComponents,
    NotificationComponent,
    AccountManagementComponent,
    DeleteAccountComponent,
    DeleteNNotificationComponent,
    DeleteAlertComponent,
    SignupComponent,
    ResetAccountComponent,
    AddnotiComponent,
    
  ],
  entryComponents: [NotificationComponent,AccountManagementComponent,DeleteAccountComponent,DeleteAlertComponent,
    DeleteNNotificationComponent,SignupComponent,ResetAccountComponent, AddnotiComponent],
})
export class SettingsModule { }
