import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent} from './settings.component';
import { AccountManagementComponent as s1 } from './accountmanagement/accountmanagement.component';
import { NotificationComponent as t1 } from './notification/notification.component';




const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [
    {
      path: 'accountmanagement',
      component: s1,
    },
    {
      path: 'notification',
      component: t1,
    }
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class settingsRoutingModule { }

export const routedComponents = [
  SettingsComponent,
  s1,
  t1
];
