import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS as lmenu } from './pages-menulogout';
import { Router } from '@angular/router';
// import { AuthenticationService } from './_services';

import { AuthenticationService } from './auth/_services';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  // currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.authenticationService.currentUser != null) {
      // this.currentUser = this.authenticationService.currentUser.username;
      this.menu = lmenu;
    } else {
      this.menu = MENU_ITEMS;
    }
  }

  // logout() {
  //     this.authenticationService.logout();
  //     this.router.navigate(['/pages/auth/login']);
  // }
}
