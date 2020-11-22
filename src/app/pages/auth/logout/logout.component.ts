import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Md5 } from 'ts-md5/dist/md5';

// import { ActivatedRoute } from '@angular/router';
// const httpHeaders = new HttpHeaders({
//   'Content-Type': 'application/json'
// });
// const options = {
//   headers: httpHeaders
// };
// interface DialogData {
// }






@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  //   styleUrls: ['./login.component.scss'],
})
export class LogoutComponent implements OnInit {



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in



  }

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigate(['/pages/auth/login']);
    
  }

}
