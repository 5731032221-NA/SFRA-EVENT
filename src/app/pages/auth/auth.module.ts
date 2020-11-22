import { NgModule } from '@angular/core';
import {NbSelectModule,NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { settingsRoutingModule, routedComponents } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { BlobModule } from 'angular-azure-blob-service';
import {NgxPaginationModule} from 'ngx-pagination';
import {LoginComponent} from './login/login.component'
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
    // BlobModule,
  ],
  declarations: [
    ...routedComponents,
    LoginComponent,
    // AccountManagementComponent,
    // DeleteAccountComponent,
    // DeleteNNotificationComponent,
    // SignupComponent,
    // ResetAccountComponent
  ],
  entryComponents: [LoginComponent],
})
export class AuthModule { }
