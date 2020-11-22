import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
interface DialogData {
  email: string;
}

@Component({
  selector: 'overtime-modal',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.css']
})
export class OvertimeComponent implements OnInit {


  displayedColumns = ['No.', 'ID', 'First Name - Last Name', 'Walk-Out Time', 'Profile Picture'];
  dataSource: any[];
  p: number = 1;
  itemsPerPage: number = 10;
  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<OvertimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.http.get<any[]>('http://20.188.110.129:3000/getmeaovertime').subscribe((res) => {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
