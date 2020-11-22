import { Component, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute } from '@angular/router';
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
  templateUrl: './addnoti.component.html',
  styleUrls: ['./addnoti.component.scss'],
})
export class AddnotiComponent {

  emails: any[];
  p: number = 1;
  email: string = '';
  Obj: any;
  evaIcons = [];
  alerts: any[];
  addalert;

  // evaIcons = [];

  constructor(

    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddnotiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.addalert = this.formBuilder.group({
      id: '',
      walkinalert: '',
      walkoutalert: '',
      email: ''
    });

  }

  onSubmit(customerData) {
    // console.log(customerData)
    this.http.post<any>('http://20.188.110.129:3000/postalert', customerData, options).subscribe(done => {
      this.dialogRef.close();
    })
  }


}

