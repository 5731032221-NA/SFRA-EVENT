import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
interface DialogData {
  id: string;
}

@Component({
  selector: 'attendance-modal',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {


  // displayedColumns = ['No.','ID', 'First Name - Last Name', 'Profile Picture'];
  dataSource: any[];
  p2: number = 1;
  itemsPerPage2: number = 10;
  title: string;
  name: string;
  surname: string;
  profileimage: any;
  // absoluteIndex(indexOnPage: number): number {
  //   return this.itemsPerPage * (this.p - 1) + indexOnPage;
  // }

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofilebyid/' + data.id).subscribe((profile) => {
      this.title = profile[0].title;
      this.name = profile[0].name;
      this.surname = profile[0].surname;
      this.profileimage = 'data:image/jpg;base64,' + profile[0].encimage;
      this.http.get<any[]>('http://20.188.110.129:3000/attendanceimage/' + data.id).subscribe(async (attendance) => {
        await attendance.sort(function (a, b) { return b.checkindatetime - a.checkindatetime; });
        console.log("bb", attendance);

        attendance.forEach((element) => {
          element['date'] = element.checkindatetime.substring(6, 8) + "-" + element.checkindatetime.substring(4, 6) + "-" + element.checkindatetime.substring(0, 4);
          //element['date'] =  element.checkindatetime.substring(6, 8) + "" + element.checkindatetime.substring(4, 6) + "" + element.checkindatetime.substring(2, 4); 
          if (element.checkout != '') {
            // console.log(element['showimg']);
            element['showimg'] = true;
            element['showimg2'] = false;
            try {
              this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + element.checkoutImageCrop).subscribe((image2) => {
                element['image2'] = 'data:image/jpg;base64,' + image2['data'];
              })
            } catch (err) {

            }
          } else {
            element['showimg'] = false;
            element['showimg2'] = true;
            element.checkoutEmotion.age = '';
          }
          try {
            this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + element.checkinImageCrop).subscribe((image) => {
              element['image1'] = 'data:image/jpg;base64,' + image['data'];
              // element['showimg'] = true;
              // console.log("hi",element.checkout != '');
            })
          } catch (err) {

          }
        })

        this.dataSource = attendance;
        console.log("aa", this.dataSource);
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
