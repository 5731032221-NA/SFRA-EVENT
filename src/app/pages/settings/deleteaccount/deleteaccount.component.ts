import { Component, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
interface DialogData {
  id: string;
  username: string
}

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const httpHeaders2 = new HttpHeaders({
  // 'Content-Type' : 'multipart/form-data'
});
const options = {
  headers: httpHeaders
};




@Component({
  selector: 'ngx-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.scss'],
})
export class DeleteAccountComponent {

  items;
  checkoutForm;
  imageFile: File
  dataSource: any[];
  myDefaultValue: String = "a"

  constructor(

    // private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // this.checkoutForm = this.formBuilder.group({
    //   // id: '',
    //   title: '',
    //   name: '',
    //   surname: '',
    //   position: '',
    //   email: '',
    // });


  }

  // ngOnInit(): any {

  //   this.route.queryParams.subscribe(params => {
  //     // console.log("params",params);
  //     this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile/' + this.data.id).subscribe((res) => {
  //       this.myDefaultValue = res[0].id
  //       this.checkoutForm = this.formBuilder.group({
  //         // id: res[0].id,
  //         title: res[0].title,
  //         name: res[0].name,
  //         surname: res[0].surname,
  //         position: res[0].position,
  //         email: res[0].email,
  //       });
  //     })
  //   })


  // }


  onSubmit() {
    this.http.delete<any>('http://20.188.110.129:3000/deleteaccount/' + this.data.id, {}).subscribe((delet) => {
      this.dialogRef.close();
    })
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // onFileChanged(event) {
  //   this.imageFile = event.target.files[0]
  // }



}

