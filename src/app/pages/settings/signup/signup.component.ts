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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  Obj: any;
  showerr: boolean = false;
  showerr1: boolean = false;
  showerr2: boolean = false;
  showerr3: boolean = false;
  // evaIcons = [];
  checkoutForm;

  constructor(

    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: '',
      cpassword: ''
    });

  }


  addTodo(event) {
    // let patt = false;
    let patt1 = '(?=.*[a-z])'
    let patt2 = '(?=.*[A-Z])'
    let patt3 = '.{8,}'
    let res1 = event.password.match(patt1);
    let res2 = event.password.match(patt2);
    let res3 = event.password.match(patt3);
    // console.log("res1",res1);
    // console.log("res2",res2);
    // console.log("res3",res3);
    // console.log("event", event);
    if (event.cpassword == event.password) {
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
        username: event.username,
        password: Md5.hashStr(event.password)
      }
      // console.log(this.Obj);

      this.http.post<any>('http://20.188.110.129:3000/postaccount', this.Obj, options).subscribe(done => {
        this.dialogRef.close();
      })}
      

    } else {
      // console.log("not change")
      this.showerr = true
    }
  }



}

