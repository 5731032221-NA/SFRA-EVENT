import { Component, OnDestroy, OnInit } from '@angular/core';
// import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

// import { UserData } from '../../../@core/data/users';
// import { LayoutService } from '../../../@core/utils';
// import { map, takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { Router } from '@angular/router';
// import { AuthenticationService } from '../../../pages/auth/_services';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // private destroy$: Subject<void> = new Subject<void>();
  // userPictureOnly: boolean = false;
  user: any;

  // themes = [
  //   {
  //     value: 'default',
  //     name: 'Light',
  //   },
  //   {
  //     value: 'dark',
  //     name: 'Dark',
  //   },
  //   {
  //     value: 'cosmic',
  //     name: 'Cosmic',
  //   },
  //   {
  //     value: 'corporate',
  //     name: 'Corporate',
  //   },
  // ];

  // currentTheme = 'default';
  // currentUser: any;

  // userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    // private sidebarService: NbSidebarService,
    // private menuService: NbMenuService,
    // private themeService: NbThemeService,
    // private userService: UserData,
    // private layoutService: LayoutService,
    // private breakpointService: NbMediaBreakpointsService,
    // private router: Router,
    // private authenticationService: AuthenticationService
    ) {
    // if (this.currentUser != null) {
    //   this.currentUser = this.authenticationService.currentUser.username;
    // }
    // console.log("this user",this.currentUser);
  }

  // ngOnInit() {
    // console.log("headername",this.currentUser)
    // if (this.authenticationService.currentUser != null) {
    //   this.currentUser = this.authenticationService.currentUser.username;
    // }
    // this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.themeService.onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe(themeName => this.currentTheme = themeName);
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  // changeTheme(themeName: string) {
  //   this.themeService.changeTheme(themeName);
  // }

  // toggleSidebar(): boolean {
  //   this.sidebarService.toggle(true, 'menu-sidebar');
  //   this.layoutService.changeLayoutSize();

  //   return false;
  // }

  // navigateHome() {
  //   this.menuService.navigateHome();
  //   return false;
  // }

  // logout() {
  //   this.authenticationService.logout();
  //   this.currentUser = null;
  //   this.router.navigate(['/pages/auth/login']);
  // }
}
