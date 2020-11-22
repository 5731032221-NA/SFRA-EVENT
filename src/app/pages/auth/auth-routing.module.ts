import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent} from './auth.component';
import { LoginComponent as s1 } from './login/login.component';
import { LogoutComponent as t1 } from './logout/logout.component';




const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: s1,
    },
    {
      path: 'logout',
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
  AuthComponent,
  s1,
  t1
];
