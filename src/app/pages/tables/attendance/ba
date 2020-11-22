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
  p: number = 1;
  itemsPerPage: number = 10;
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
      this.http.get<any[]>('http://20.188.110.129:3000/attendance/' + data.id).subscribe((attendance) => {

        attendance.forEach((element) => {
          let emotion1 = element.checkin.emotion.emotion;
          //console.log("emo:", emotion1);
          let emo = 'neutral';
          let maxProp = null
          let maxValue = -1
          let secProp = null
          let secValue = -1

          for (var prop in emotion1) {
            if (emotion1.hasOwnProperty(prop)) {

              let value = emotion1[prop]
              if (value > maxValue) {
                secValue = maxValue;
                secProp = maxProp
                maxValue = value;
                maxProp = prop
              } else if (secValue < value) {
                secValue = value;
                secProp = prop
              }
            }
          }

          if (maxProp == 'neutral') {
            if (maxValue == 1) {
            }
            else if (maxValue < 1) {
              if (secProp == 'anger') emo = 'anger';
              else if (secProp == 'contempt') emo = 'contempt';
              else if (secProp == 'disgust') emo = 'disgust';
              else if (secProp == 'fear') emo = 'fear';
              else if (secProp == 'happiness') emo = 'happiness';
              else if (secProp == 'sadness') emo = 'sadness';
              else if (secProp == 'surprise') emo = 'surprise';
            }
          }
          else if (maxProp == 'anger') emo = 'anger';
          else if (maxProp == 'contempt') emo = 'contempt';
          else if (maxProp == 'disgust') emo = 'disgust';
          else if (maxProp == 'fear') emo = 'fear';
          else if (maxProp == 'happiness') emo = 'happiness';
          else if (maxProp == 'sadness') emo = 'sadness';
          else if (maxProp == 'surprise') emo = 'surprise';

          element['emotion1'] = emo;
        })

        attendance.forEach((element) => {
          if (element.checkout.time != '') {
            let emotion1 = element.checkout.emotion.emotion;
            //console.log("emo:", emotion1);

            let maxProp = null
            let maxValue = -1
            let secProp = null
            let secValue = -1
            let emo = "neutral";
            for (var prop in emotion1) {
              if (emotion1.hasOwnProperty(prop)) {

                let value = emotion1[prop]
                if (value > maxValue) {
                  secValue = maxValue;
                  secProp = maxProp
                  maxValue = value;
                  maxProp = prop
                } else if (secValue < value) {
                  secValue = value;
                  secProp = prop
                }
              }
            }

            if (maxProp == 'neutral') {
              if (maxValue == 1) {
              }
              else if (maxValue < 1) {
                if (secProp == 'anger') emo = 'anger';
                else if (secProp == 'contempt') emo = 'contempt';
                else if (secProp == 'disgust') emo = 'disgust';
                else if (secProp == 'fear') emo = 'fear';
                else if (secProp == 'happiness') emo = 'happiness';
                else if (secProp == 'sadness') emo = 'sadness';
                else if (secProp == 'surprise') emo = 'surprise';
              }
            }
            else if (maxProp == 'anger') emo = 'anger';
            else if (maxProp == 'contempt') emo = 'contempt';
            else if (maxProp == 'disgust') emo = 'disgust';
            else if (maxProp == 'fear') emo = 'fear';
            else if (maxProp == 'happiness') emo = 'happiness';
            else if (maxProp == 'sadness') emo = 'sadness';
            else if (maxProp == 'surprise') emo = 'surprise';

            element['emotion2'] = emo;
          }
        })
        this.dataSource = attendance
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
