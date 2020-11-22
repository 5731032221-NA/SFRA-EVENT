import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { DeleteNNotificationComponent } from '../deletenotification/deletenotification.component'
import { DeleteAlertComponent } from '../deletealert/deletealert.component'

import { AddnotiComponent } from '../addnoti/addnoti.component'

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const options = {
  headers: httpHeaders
};


// import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
// interface TreeNode<T> {
//   data: T;
//   children?: TreeNode<T>[];
//   expanded?: boolean;
// }

// interface FSEntry {
//   name: string;
//   size: string;
//   kind: string;
//   items?: number;
// }



@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  emails: any[];
  p: number = 1;
  email: string = '';
  Obj: any;
  evaIcons = [];
  alerts: any[];
  checkoutForm;
  addalert;
  displayedColumns = ['#', 'email', 'action'];
  // displayedColumns2 = ['#', 'รหัสพนักงาน', 'ชื่อ-สกุล', 'walk-in alert', 'walk-out alert', 'send to (email)', 'action'];
  displayedColumns2 = ['#', 'รหัสพนักงาน', 'แจ้งเตือนขาเข้า', 'แจ้งเตือนขาออก', 'ส่งการแจ้งเตือน (email)', 'action'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog) {
    this.addalert = this.formBuilder.group({
      email: '',
      walkinalert: false,
      walkoutalert: false,
      id: ''
    });
    this.checkoutForm = this.formBuilder.group({
      email: ''
    });
    this.http.get<any[]>('http://20.188.110.129:3000/getnotification').subscribe((emails) => {

      this.emails = emails;

    })

    this.http.get<any[]>('http://20.188.110.129:3000/getalert').subscribe((alerts) => {
      // console.log(alert);
      alerts.forEach((element) => {
        if(element.walkinalert == true) element['walkin'] = "yes";
        else element['walkin'] = "no";

        if(element.walkoutalert == true) element['walkout'] = "yes";
        else element['walkout'] = "no";
      })
      this.alerts = alerts;
    })
    // this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    //   .filter(icon => icon.indexOf('outline') === -1);
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  addTodo(event) {
    console.log("event", event);
    this.Obj = {
      email: event.email,

    }
    console.log(this.Obj);
    // this.todos.push(this.todoObj);
    this.http.post<any>('http://20.188.110.129:3000/postnotification', this.Obj, options).subscribe(done => {
      this.http.get<any[]>('http://20.188.110.129:3000/getnotification').subscribe((emails) => {

        this.emails = emails;

      })
    })


    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    // event.preventDefault();
  }


  deleteDialog(id, email): void {
    const dialogRef = this.dialog.open(DeleteNNotificationComponent, {
      width: '820px',
      data: { id, email }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getnotification').subscribe((emails) => {

        this.emails = emails;

      })

    });
  }

  deleteDialog2(id, email): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: '820px',
      data: { id, email }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getalert').subscribe((alerts) => {
        alerts.forEach((element) => {
          if(element.walkinalert == true) element['walkin'] = "yes";
          else element['walkin'] = "no";

          if(element.walkoutalert == true) element['walkout'] = "yes";
          else element['walkout'] = "no";
        })
        this.alerts = alerts;

      })

    });
  }

  addnotiDialog(): void {
    const dialogRef = this.dialog.open(AddnotiComponent, {
      width: '820px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://20.188.110.129:3000/getalert').subscribe((alerts) => {
        alerts.forEach((element) => {
          if(element.walkinalert == true) element['walkin'] = "yes";
          else element['walkin'] = "no";

          if(element.walkoutalert == true) element['walkout'] = "yes";
          else element['walkout'] = "no";
        })
        this.alerts = alerts;

      })

    });
  }

  onSubmit(customerData) {
    // console.log(customerData)
    this.http.post<any>('http://20.188.110.129:3000/postalert', customerData, options).subscribe(done => {
      this.http.get<any[]>('http://20.188.110.129:3000/getalert').subscribe((alerts) => {

        alerts.forEach((element) => {
          if(element.walkinalert == true) element['walkin'] = "yes";
          else element['walkin'] = "no";

          if(element.walkoutalert == true) element['walkout'] = "yes";
          else element['walkout'] = "no";
        })
        this.alerts = alerts;

      })
    })
  }



}

