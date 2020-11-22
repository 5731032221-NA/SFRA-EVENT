import { Component, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute } from '@angular/router';

interface DialogData {
  id: string;
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
  selector: 'ngx-resetaccount',
  templateUrl: './resetaccount.component.html',
  styleUrls: ['./resetaccount.component.scss'],
})
export class ResetAccountComponent {

  
  Obj: any;
  checkoutForm;
  showerr: boolean = false;
  showerr1: boolean = false;
  showerr2: boolean = false;
  showerr3: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ResetAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // this.checkoutForm = this.formBuilder.group({
    //   // id: '',
    //   title: '',
    //   name: '',
    //   surname: '',
    //   position: '',
    //   email: '',
    // });
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });


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


  resetpass(formdata) {
    let patt1 = '(?=.*[a-z])'
    let patt2 = '(?=.*[A-Z])'
    let patt3 = '[a-zA-Z0-9]{8,}'
    let res1 = formdata.password.match(patt1);
    let res2 = formdata.password.match(patt2);
    let res3 = formdata.password.match(patt3);

    if (formdata.username == formdata.password) {
      this.showerr = false;
      if(res1){
        this.showerr1 = false;
      }else{
        this.showerr1 = true;
      }
      if(res2){
        this.showerr2 = false;
      }else{
        this.showerr2 = true;
      }
      if(res3){
        this.showerr3 = false;
      }else{
        this.showerr3 = true;
      }
      if(res1 && res2 && res3){
      this.Obj = {
        password: Md5.hashStr(formdata.password)
      }
      console.log(this.data.id)
      console.log(this.Obj);
      this.http.post<any>('http://20.188.110.129:3000/postaccount/' + this.data.id,this.Obj, options).subscribe((delet) => {
        this.dialogRef.close();
      })}
    }else{
      // console.log("not change")
      this.showerr = true
    }


  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // onFileChanged(event) {
  //   this.imageFile = event.target.files[0]
  // }



}

