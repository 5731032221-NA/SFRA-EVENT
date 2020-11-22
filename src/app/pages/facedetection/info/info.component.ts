import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClient } from '@angular/common/http';

import { NgxSpinnerService } from "ngx-spinner";
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TrainComponent } from '../train/train.component'
import { DeleteComponent } from '../delete/deletet.component'
import { EditComponent } from '../edit/edit.component'


@Component({
  selector: 'info-modal',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  // displayedColumns = ['No.','ID', 'First Name - Last Name', 'Profile Picture'];
  dataSource: any[];
  p2: number = 1;
  itemsPerPage2: number = 10;
  title: string;
  name: string;
  surname: string;
  profileimage: any;
  listmea: any[];
  data: any;
  selectedCar: string;
  // datecal: any | null;
  model: any;
  date: { year: number, month: number };
  empty: boolean = false;
  // absoluteIndex(indexOnPage: number): number {
  //   return this.itemsPerPage * (this.p - 1) + indexOnPage;
  // }

  constructor(
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    public dialog: MatDialog) {
    this.spinner.show();
    var date_ob = new Date();
    date_ob.setDate(date_ob.getDate());
    let date = date_ob.getDate();

    // current month
    let month = (date_ob.getMonth() + 1);

    // current year
    let year = date_ob.getFullYear();

    this.model = { year: year, month: month, day: date };

    var querydate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + date).slice(-2);

    this.http.get<any[]>('http://20.188.110.129:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {

      this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe(profile => {

        if (cropinfo.length > 0) {
          this.empty = false;
        } else {
          this.empty = true;
        }

        cropinfo.forEach((element) => {

          if (element["train"] != "") {
            console.log("train")
            profile.forEach((pr) => {
              if (element.train == pr.id) {
                element['ttitle'] = pr.title;
                element['tnameem'] = pr.name;
                element['tsurname'] = pr.surname;
              }

            })

            element['canselect'] = false;
          }
          else element['canselect'] = false;

          // this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + element.name).subscribe((image) => {

          //   element['image1'] = 'data:image/jpg;base64,' + image['data'];


          // })
          try {
            if (element['camera'] == 1) element['inout'] = "ขาเข้า A"
            else if (element['camera'] == 2) element['inout'] = "ขาออก A"
            else if (element['camera'] == 3) element['inout'] = "ขาเข้า B"
            else if (element['camera'] == 4) element['inout'] = "ขาออก B"
          } catch (err) {
            element['inout'] = "-"
          }

          if (element.detected != "") {
            profile.forEach((pr) => {
              if (element.detected == pr.id) {
                element['title'] = pr.title;
                element['nameem'] = pr.name;
                element['surname'] = pr.surname;
                element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
                element['individual_confidence'] = (pr.individual_confidence * 100).toFixed(2);

              }

            })
          }
        })

        let list = [{ 'name': "เลือกพนักงาน -" }, ...profile];
        list.sort((a, b) => (a.id - b.id));
        this.listmea = list;
        var pagefrom = (this.p2 - 1) * this.itemsPerPage2;
        var pageto = this.p2 * this.itemsPerPage2;
        for (var page = pagefrom; page < pageto; page++) {
          let index = page
          this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + cropinfo[index].name).subscribe((image) => {
            cropinfo[index]['image1'] = 'data:image/jpg;base64,' + image['data'];
          })
        }
        // this.listmea = [{ 'name': " เลือกพนักงาน -" }, ...profile];
        this.dataSource = cropinfo;
        // if(this.dataSource.length > 0){
        //   this.empty = false;
        // }else{
        //   this.empty = true;
        // }
        // console.log("aa", this.dataSource);
        this.spinner.hide();
      })
    })
  }

  selectToday() {
    this.model = this.calendar.getToday();

  }

  trainDialog(name, title, nameem, surname, rowid, datetime, date, camera): void {
    // console.log(rowid)
    let e = document.getElementById(rowid) as HTMLSelectElement;;
    let item = e.options[e.selectedIndex].value;
    let id = item.substring(0, 7);
    const dialogRef = this.dialog.open(TrainComponent, {
      width: '820px',
      data: { id, name, title, item, surname, rowid, datetime, date, camera }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        for (var i = 0; i < this.dataSource.length; i++) {
          if (this.dataSource[i]._id === rowid) {
            this.dataSource[i].train = id;
            this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe(profile => {


              // console.log("train")
              profile.forEach((pr) => {
                if (id == pr.id) {
                  this.dataSource[i]['ttitle'] = pr.title;
                  this.dataSource[i]['tnameem'] = pr.name;
                  this.dataSource[i]['tsurname'] = pr.surname;
                }

              })



            })
            break;
          }
        }
      }

    });
  }

  onDateSelection(date: NgbDate) {
    this.model = date;

    let date_ob = new Date(date.year, date.month - 1, date.day);

    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    var querydate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
    // console.log(querydate)
    this.http.get<any[]>('http://20.188.110.129:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {

      this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe(profile => {

        if (cropinfo.length > 0) {
          this.empty = false;
        } else {
          this.empty = true;
          this.dataSource = [];
        }

        cropinfo.forEach((element) => {

          if (element["train"] != "") {
            console.log("train")
            profile.forEach((pr) => {
              if (element.train == pr.id) {
                element['ttitle'] = pr.title;
                element['tnameem'] = pr.name;
                element['tsurname'] = pr.surname;
              }

            })

            element['canselect'] = false;
          }
          else element['canselect'] = false;

          // this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + element.name).subscribe((image) => {

          //   element['image1'] = 'data:image/jpg;base64,' + image['data'];


          // })

          try {
            if (element['camera'] == 1) element['inout'] = "ขาเข้า A"
            else if (element['camera'] == 2) element['inout'] = "ขาออก A"
            else if (element['camera'] == 3) element['inout'] = "ขาเข้า B"
            else if (element['camera'] == 4) element['inout'] = "ขาออก B"
          } catch (err) {
            element['inout'] = "-"
          }

          if (element.detected != "") {
            profile.forEach((pr) => {
              if (element.detected == pr.id) {
                element['title'] = pr.title;
                element['nameem'] = pr.name;
                element['surname'] = pr.surname;
                element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
                element['individual_confidence'] = (pr.individual_confidence * 100).toFixed(2);

              }

            })
          }
        })

        let list = [{ 'name': "เลือกพนักงาน -" }, ...profile];
        list.sort((a, b) => (a.id - b.id));
        this.listmea = list;
        var pagefrom = (this.p2 - 1) * this.itemsPerPage2;
        var pageto = this.p2 * this.itemsPerPage2;
        for (var page = pagefrom; page < pageto; page++) {
          let index = page
          this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + cropinfo[index].name).subscribe((image) => {
            cropinfo[index]['image1'] = 'data:image/jpg;base64,' + image['data'];
          })
        }
        this.dataSource = cropinfo;
        // if(this.dataSource.length > 0){
        //   this.empty = false;
        // }else{
        //   this.empty = true;
        // }
        // console.log("aa", this.dataSource);
        this.spinner.hide();
      })
    })
  }

  deleteDialog(id, name): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '820px',
      data: { id, name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(function (obj) {
          return obj._id !== id; // Or whatever value you want to use
        });

        var index = (this.p2 * this.itemsPerPage2) - 1;


        this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + this.dataSource[index].name).subscribe((image) => {
          this.dataSource[index]['image1'] = 'data:image/jpg;base64,' + image['data'];

        })
      }
      if (this.dataSource.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }

    });
  }

  editDialog(id_detected, individual_confidence): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '820px',
      data: { id_detected, individual_confidence }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed", result);

      if (result > 0) {
        // let dataSource = this.dataSource
        this.dataSource.forEach(element => {

          if (element['detected'] == id_detected) element['individual_confidence'] = result;

          //  element['per'] = "(" + result  + "%)";
        });
        // this.dataSource = dataSource


      }



    });
  }

  onChangePage(pageOfItems: any) {
    // update current page of items
    var pagefrom = (this.p2 - 1) * this.itemsPerPage2;
    var pageto = this.p2 * this.itemsPerPage2;
    for (var page = pagefrom; page < pageto; page++) {
      let index = page

      this.http.get<any[]>('http://20.188.110.129:3000/getcropimage/' + this.dataSource[index].name).subscribe((image) => {
        this.dataSource[index]['image1'] = 'data:image/jpg;base64,' + image['data'];

      })
    }


  }

  ngOnInit() {
  }
}
