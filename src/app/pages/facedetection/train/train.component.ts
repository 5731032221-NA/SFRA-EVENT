import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
interface DialogData {
  id: any;
  name: string;
  title: string;item: string;surname: string;
  rowid: string;
  datetime: string;
  date: string;
  camera: number;
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
  selector: 'ngx-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
})
export class TrainComponent {


  pic: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<TrainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + this.data.name).subscribe((done) => {
     
        this.pic = 'data:image/jpg;base64,' + done['data'];
      })


  }

  ngOnInit(): any {

    


  }



  onSubmit() {
   
   
      // if (this.data.camera == 2 || this.data.camera == 4) {
        this.http.get<any[]>('http://20.188.110.129:3000/chagnetime/' + this.data.date + '/' + this.data.datetime + '/' + this.data.id + '/' + this.data.name).subscribe((done) => {
          this.http.get<any[]>('http://20.188.110.129:3000/traincropimage/' + this.data.name + '/' + this.data.id + '/' + this.data.rowid).subscribe((done) => {
        this.dialogRef.close(true)
        })
      // }  
      // else {
        // this.http.get<any[]>('http://20.188.110.129:3000/chagnecheckintime/' + this.data.date + '/' + this.data.datetime + '/' + this.data.id + '/' + this.data.name).subscribe((done) => {
          // this.dialogRef.close(true)
        // })
      // }
    })

  }

  
 

}

