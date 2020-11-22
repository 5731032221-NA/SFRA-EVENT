import { Router } from '@angular/router';
import { Component } from '@angular/core';
// import { LocalDataSource } from 'ng2-smart-table';

// import { SmartTableData } from '../../../@core/data/smart-table';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DeleteAccountComponent } from '../deleteaccount/deleteaccount.component'
import { ResetAccountComponent} from '../resetaccount/resetaccount.component'
import { SignupComponent } from '../signup/signup.component'

import { FormBuilder } from '@angular/forms';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const options = {
  headers: httpHeaders
};


@Component({
  selector: 'ngx-accountmanagement',
  templateUrl: './accountmanagement.component.html',
  styleUrls: ['./accountmanagement.component.scss'],
})

export class AccountManagementComponent {
  accounts: any[];
  p: number = 1;
  displayedColumns = ['#','username', 'action'];

  // username: string = '';
  // password: string = '';
  // Obj: any;
  // evaIcons = [];
  checkoutForm;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router, public dialog: MatDialog) {

    // this.checkoutForm = this.formBuilder.group({
    //   username: '',
    //   password: ''
    // });
    this.http.get<any[]>('http://20.188.110.129:3000/getaccount').subscribe((accounts) => {

      this.accounts = accounts;

    })
    // this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    //   .filter(icon => icon.indexOf('outline') === -1);
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  // addTodo(event) {
  //   console.log("event",event);
  //   this.Obj = {
  //     username: event.username,
  //     password: Md5.hashStr(event.password)
  //   }
  //   console.log(this.Obj);
  //   // this.todos.push(this.todoObj);
  //   this.http.post<any>('http://20.188.110.129:3000/postaccount', this.Obj, options).subscribe(done =>  {
  //   this.http.get<any[]>('http://20.188.110.129:3000/getaccount').subscribe((accounts) => {

  //     this.accounts = accounts;

  //   })
  // })
    
    
  // this.checkoutForm = this.formBuilder.group({
  //   username: '',
  //   password: ''
  // });
  //   // event.preventDefault();
  // }


  deleteDialog(id, username): void {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: '820px',
      data: { id, username }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getaccount').subscribe((accounts) => {

        this.accounts = accounts;

      })

    });
  }

  resetDialog(id): void {
    const dialogRef = this.dialog.open(ResetAccountComponent, {
      width: '820px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getaccount').subscribe((accounts) => {

        this.accounts = accounts;

      })

    });
  }

  signupDialog(id, username): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '820px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getaccount').subscribe((accounts) => {

        this.accounts = accounts;

      })

    });
  }

}
