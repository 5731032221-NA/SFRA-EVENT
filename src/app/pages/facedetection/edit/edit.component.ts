import { Component, Input, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
interface DialogData {
  id_detected: string;
  individual_confidence: number;
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
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  checkoutForm;
  constructor(

    // private formBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.checkoutForm = this.formBuilder.group({
        Confidence: this.data.individual_confidence
       
      });

  }




  onSubmit(inputdata) {
    let con = (inputdata.Confidence/100.0).toFixed(2);
    this.http.post<any>('http://20.188.110.129:3000/updateconfidence/' + this.data.id_detected + '/'+con, {}).subscribe((updated) => {
      this.dialogRef.close(inputdata.Confidence)
    })
  }


 


}

