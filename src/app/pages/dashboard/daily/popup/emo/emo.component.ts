import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
interface DialogData {
  emo: string;
  gender: string;
}

@Component({
  selector: 'emo-modal',
  templateUrl: './emo.component.html',
  styleUrls: ['./emo.component.css']
})
export class EmoComponent implements OnInit {


  displayedColumns = ['No.', 'ID', 'First Name - Last Name', 'Walk-In Time', 'Walk-Out Time', 'Profile Picture'];
  dataSource: any[];
  p: number = 1;
  itemsPerPage: number = 10;
  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EmoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    if (data.emo == "Overall") {
      this.http.get<any>('http://20.188.110.129:3000/getmeaprofile').subscribe((getmeaprofile) => {
        this.http.get<any[]>('http://20.188.110.129:3000/getmeabygender/' + data.gender).subscribe((res) => {
          res.forEach((element) => {
            this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
              // this.happy = [];
              element['image_data'] = 'data:image/jpg;base64,' + res[0].encimage;
            });
            // resdata.push(element.count);

          })
          this.dataSource = res;
        })
      })
    } else {
      let emo = 'neutral'
      if (data.emo == "Happy") emo = 'happy'
      else if (data.emo == "Unhappy") emo = 'unhappy'
      this.http.get<any[]>('http://20.188.110.129:3000/getmeabygender/' + data.gender + '/' + emo).subscribe((res) => {
        res.forEach((element) => {
          this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
            // this.happy = [];
            element['image_data'] = 'data:image/jpg;base64,' + res[0].encimage;
          });
          // resdata.push(element.count);

        })
        this.dataSource = res;
      })
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
