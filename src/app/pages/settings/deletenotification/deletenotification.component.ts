import { Component, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
interface DialogData {
  id: string;
  nameid: string
}




@Component({
  selector: 'ngx-deletenotification',
  templateUrl: './deletenotification.component.html',
  styleUrls: ['./deletenotification.component.scss'],
})
export class DeleteNNotificationComponent {

  items;
  checkoutForm;
  imageFile: File
  dataSource: any[];
  myDefaultValue: String = "a"

  constructor(

    // private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteNNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {



  }



  onSubmit() {
    this.http.delete<any>('http://20.188.110.129:3000/deletenotification/' + this.data.id, {}).subscribe((delet) => {
      this.dialogRef.close();
    })
  }




}

