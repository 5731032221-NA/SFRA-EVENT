import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
// import { ActivatedRoute } from '@angular/router';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const options = {
  headers: httpHeaders
};
interface DialogData {
}






@Component({
  selector: 'ngx-signup',
  templateUrl: './login.component.html',
  //   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    
    

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //   this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //         this.router.navigate([this.returnUrl]);
    //       },
    //       error => {
    //         this.error = error;
    //         this.loading = false;
    //       });
    let pass = Md5.hashStr(this.f.password.value)
    this.http.get<any>('http://20.188.110.129:3000/getlogin/' + this.f.username.value + '/' + pass, options).subscribe(done => {
      console.log("done", done);
      if (done.result == true) {
        this.router.navigate([this.returnUrl]);
        this.authenticationService.login(this.f.username.value, this.f.password.value)
      } else {
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
    })


  }
}
