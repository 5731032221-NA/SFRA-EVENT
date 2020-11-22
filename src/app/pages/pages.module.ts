import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { PagesRoutingModule } from './pages-routing.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    // LoginComponent
    // DashboardModule,
    // ECommerceModule,
    // MiscellaneousModule,
  ],
  declarations: [
   
    PagesComponent,
    // LoginComponent
  ],
  
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  //   // provider used to create fake backend
  // ],
})
export class PagesModule {
}
