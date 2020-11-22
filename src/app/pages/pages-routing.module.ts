import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
// import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_helpers';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
  path: '', 
  // path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('./forms/forms.module')
    //     .then(m => m.FormsModule),
    // },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'maps',
    //   loadChildren: () => import('./maps/maps.module')
    //     .then(m => m.MapsModule),
    // },
    {
      path: 'dashboard',canActivate: [AuthGuard],
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    // {
    //   path: 'charts',
    //   loadChildren: () => import('./charts/charts.module')
    //     .then(m => m.ChartsModule),
    // },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    {
      path: 'tables',canActivate: [AuthGuard],
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'facedetection',canActivate: [AuthGuard],
      loadChildren: () => import('./facedetection/facedetection.module')
        .then(m => m.FacedetectionModule),
    },
    {
      path: 'settings',canActivate: [AuthGuard],
      loadChildren: () => import('./settings/settings.module')
        .then(m => m.SettingsModule),
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthModule),
    },
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
    {
      path: '',
      redirectTo: 'dashboard/daily',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
