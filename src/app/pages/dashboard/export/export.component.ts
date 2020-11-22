import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'ngx-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  // data: any = [{
  //   eid: 'e101',
  //   ename: 'ravi',
  //   esal: 1000
  // }, {
  //   eid: 'e102',
  //   ename: 'ram',
  //   esal: 2000
  // }, {
  //   eid: 'e103',
  //   ename: 'rajesh',
  //   esal: 3000
  // }];
  hoveredDate: NgbDate | null = null;
  empty: boolean = false;
  fromDate: any | null;
  toDate: any | null;
  // minDate: any = {year: 2020, month: 4, day: 20}
  maxDate: any;

  displayedColumns = ['รหัสพนักงาน', 'ชื่อ - สกุล', 'วันที่', 'เพศ', 'อายุ-ขาเข้า', 'วันเวลา-ขาเข้า', 'อารมณ์เข้างาน', 'อายุ-ขาออก', 'วันเวลา-ขาออก', 'อารมณ์ออกงาน'];
  dataSource: any[];
  p: number = 1;
  // from: any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  // to: any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  // myGroup = new FormGroup({ firstName: new FormControl() });
  minDate: any = { year: 2020, month: 4, day: 20 }
  ngOnInit() {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = date_ob.getSeconds();
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + date + month + year + '_' + hours + minutes + EXCEL_EXTENSION);
  }

  exportAsXLSX(): void {
    let data = []
    // this.dataSource.sort((a, b) => (b['วันที่'] - a['วันที่']));
    this.dataSource.forEach((el) => {
      let arr = []
      // console.log(el)
      arr['รหัสพนักงาน'] = el.id;
      arr['ชื่อ - สกุล'] = el.title + " " + el.name + " " + el.surname;
      arr['วันที่'] = el.checkindatetime.substring(6, 8) + "-" + el.checkindatetime.substring(4, 6) + "-" + el.checkindatetime.substring(0, 4);
      arr['เพศ'] = el.checkinEmotion.gender;
      arr['อายุ-ขาเข้า'] = el.checkinEmotion.age;
      arr['วันเวลา-ขาเข้า'] = el.checkin;
      arr['อารมณ์เข้างาน'] = el.checkinEmo;
      arr['อายุ-ขาออก'] = el.checkoutEmotion.age;
      arr['วันเวลา-ขาออก'] = el.checkout;
      arr['อารมณ์ออกงาน'] = el.checkoutEmo;
      // console.log(arr)
      data = [...data, arr];
      // console.log(data);
    })
    // console.log("fi")

    // console.log("tt");
    this.exportAsExcelFile(data, 'sfra_report_');
  }

  myForm;

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private http: HttpClient, private router: Router) {
    var date_ob = new Date();
    date_ob.setDate(date_ob.getDate() );
    let date = date_ob.getDate();

    // current month
    let month = (date_ob.getMonth() + 1);

    // current year
    let year = date_ob.getFullYear();

    var date_ob2 = new Date();
    date_ob2.setDate(date_ob2.getDate() - 8);
    let date2 = date_ob2.getDate();

    // current month
    let month2 = (date_ob2.getMonth() + 1);

    // current year
    let year2 = date_ob2.getFullYear();
    this.maxDate = { year: year, month: month, day: date };
    this.fromDate = { year: year2, month: month2, day: date2 };
    this.toDate = { year: year, month: month, day: date };
    this.myForm = this.formBuilder.group({
      fromDate: { year: year2, month: month2, day: date2 },
      todate: { year: year, month: month, day: date },
    });

       var to = year + ("0" +month).slice(-2) + ("0" +date).slice(-2);

   
    var from = year2 + ("0" +month2).slice(-2) + ("0" +date2).slice(-2);

    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/getexport/' + from + '/' + to).subscribe((checkin) => {
        if (checkin.length > 0) {
          checkin.forEach((element) => {
            element['date'] = element.checkindatetime.substring(6, 8) + "-" + element.checkindatetime.substring(4, 6) + "-" + element.checkindatetime.substring(0, 4);

            if (element.checkout == '') {
              element.checkout = '-';
              element.checkoutEmo = '-';
              element.checkoutEmotion.age = '-'
            }
            profile.forEach((element2) => {

              if (element.id == element2.id) {
                element['title'] = element2.title;
                element['name'] = element2.name;
                element['surname'] = element2.surname;
              }

            })

          })

          this.empty = false;
          this.dataSource = checkin;
        } else {
          this.empty = true;
          this.dataSource = checkin;
        }
      })

    })

    // this.http.get<any>('http://20.188.110.129:3000/countmeaprofile').subscribe((res) => { console.log(res) })


  }

  // toplist(type: string, event: MatDatepickerInputEvent<Date>) {
  //   // this.events.push(`${type}: ${event.value}`);
  //   // console.log(type, event);
  //   let date_ob = event.value;
  //   let date = ("0" + date_ob.getDate()).slice(-2);

  //   // current month
  //   let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  //   // current year
  //   let year = date_ob.getFullYear();
  //   if (type == "startDate") {
  //     this.from = year + month + date
  //   } else if (type == "EndDate") {
  //     this.to = year + month + date
  //   }

  //   this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
  //     this.http.get<any[]>('http://20.188.110.129:3000/getexport/' + this.from + '/' + this.to).subscribe((checkin) => {
  //       checkin.forEach((element) => {
  //         element['date'] = element.checkindatetime.substring(6, 8) + "-" + element.checkindatetime.substring(4, 6) + "-" + element.checkindatetime.substring(0, 4);
  //         if (element.checkout == '') {
  //           element.checkout = '-';
  //           element.checkoutEmo = '-';
  //         }
  //         profile.forEach((element2) => {

  //           if (element.id == element2.id) {
  //             element['title'] = element2.title;
  //             element['name'] = element2.name;
  //             element['surname'] = element2.surname;
  //           }

  //         })

  //       })
  //       this.dataSource = checkin;
  //     })
  //   })
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    let to_date = this.toDate;
    if (to_date == null) {
      to_date = this.fromDate
    }
    let date_ob = new Date(to_date.year, to_date.month - 1, to_date.day);

    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    var to = year + month + day

    let date_ob2 = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    date_ob2.setDate(date_ob2.getDate() - 1);
    let day2 = ("0" + date_ob2.getDate()).slice(-2);

    // current month
    let month2 = ("0" + (date_ob2.getMonth() + 1)).slice(-2);

    // current year
    let year2 = date_ob2.getFullYear();
    var from = year2 + month2 + day2



    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/getexport/' + from + '/' + to).subscribe((checkin) => {
        if (checkin.length > 0) {
          checkin.forEach((element) => {
            element['date'] = element.checkindatetime.substring(6, 8) + "-" + element.checkindatetime.substring(4, 6) + "-" + element.checkindatetime.substring(0, 4);

            if (element.checkout == '') {
              element.checkout = '-';
              element.checkoutEmo = '-';
              element.checkoutEmotion.age = '-'
            }
            profile.forEach((element2) => {

              if (element.id == element2.id) {
                element['title'] = element2.title;
                element['name'] = element2.name;
                element['surname'] = element2.surname;
              }

            })

          })

          this.empty = false;
          this.dataSource = checkin;
        } else {
          this.empty = true;
          this.dataSource = checkin;
        }
      })
    })
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  isDisble(date: NgbDate) {
    return date.before(this.minDate) || date.after(this.maxDate);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    console.log("validateInput");
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}

