import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
// import * as Highcharts from 'highcharts';
import { StockChart } from 'angular-highcharts';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
// declare var require: any;
// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
// let More = require('highcharts/highcharts-more');

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);




@Component({
  selector: 'ngx-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent {
  // startDate = new Date();
  // endDate = new Date();
  stock: StockChart;
  stock2: StockChart;
  dataemo: any;
  from: any = "20200401";
  to: any = formatDate(new Date(), 'yyyyMMdd', 'en');;
  topdata: any[];

  hoveredDate: NgbDate | null = null;
  empty: boolean = false;
  fromDate: any | null;
  toDate: any | null;
  // minDate: any = {year: 2020, month: 4, day: 20}
  maxDate: any;
  minDate: any = { year: 2020, month: 4, day: 20 }

  // Highcharts: typeof Highcharts = Highcharts;
  ngOnInit() {
    this.http.get<any>('http://20.188.110.129:3000/gethistoricalemo').subscribe((res) => {
      // console.log(res)
      // this.dataemo = res
      let date_now = new Date();
      let date = ("0" + date_now.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_now.getMonth() + 1)).slice(-2);

      // current year
      let year = date_now.getFullYear();

      let date_today = new Date(year + "-" + month + "-" + date);
      this.http.get<any>('http://20.188.110.129:3000/getcheckin').subscribe((result) => {

        // console.log("checkin",result)
        var neutral = 0;
        var happy = 0;
        var unhappy = 0;


        result.forEach(element => {
          // asyncForEach(result, async (element) => {




          if (element.checkinEmo == 'neutral') {
            neutral++;
          }
          else if (element.checkinEmo == "happiness" || element.checkinEmo == "surprise") {
            happy++;
          }
          else unhappy++;

          if (element.checkoutEmo == 'neutral') {
            neutral++;
          }
          else if (element.checkoutEmo == "happiness" || element.checkoutEmo == "surprise") {
            happy++;
          }
          else unhappy++;
          //console.log(neutral, happy, unhappy)
          // itemsProcessed++;
          // if (itemsProcessed === result.length) {

          // }


        });

        // res[0].data = [...res[0].data, [Date.parse(date_today.toString()), neutral]]
        // res[1].data = [...res[1].data, [Date.parse(date_today.toString()), happy]]
        // res[2].data = [...res[2].data, [Date.parse(date_today.toString()), unhappy]]

        
        res[0].data = [...res[0].data, [Date.parse(date_today.toString()), unhappy]]
        res[1].data = [...res[1].data, [Date.parse(date_today.toString()), neutral]]
        res[2].data = [...res[2].data, [Date.parse(date_today.toString()), happy]]

        this.stock = new StockChart({
          chart: {
            type: 'spline'
            // type: 'areaspline'
          },
          rangeSelector: {
            selected: 4
          },
          credits: {
            enabled: false
          },

          // exporting: {
          //   buttons: {
          //       contextButton: {
          //           menuItems: [{
          //               textKey: 'downloadXLS',
          //               onclick: function () {
          //                   this.downloadXLS();
          //               }
          //           }, {
          //               textKey: 'downloadCSV',
          //               onclick: function () {
          //                   this.downloadCSV();
          //               }
          //           }]
          //       }
          //   }
          // },

          yAxis: {
            // labels: {
            //   formatter: function () {
            //     return (this.value > 0 ? ' + ' : '') + this.value + '%';
            //   }
            // },
            plotLines: [{
              value: 0,
              width: 2,
              color: 'silver'
            }]
          },

          xAxis: {
            type: 'datetime',
            gridLineWidth: 1,
            labels: {

              style: {
                fontSize: '12px'
              }
            }
          },
          plotOptions: {
            series: {
              // compare: 'percent',
              showInNavigator: true
            }
          },

          tooltip: {

            // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            // valueDecimals: 2,
            split: true
          },
          legend: {
            enabled: true
          },
          colors: ['#8FcBFA', '#FF7701', '#7D7D7D'],
          // series: [{ name: "Happy", data: []},
          // { name: "Happy", data: []},
          // { name: "Happy", data: []}]
          series: res
        });
      })
    })

    this.http.get<any>('http://20.188.110.129:3000/gethistoricalcheckin').subscribe((res) => {
      // console.log(res)
      let date_now = new Date();
      let date = ("0" + date_now.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_now.getMonth() + 1)).slice(-2);

      // current year
      let year = date_now.getFullYear();

      let date_today = new Date(year + "-" + month + "-" + date);
      this.http.get<any>('http://20.188.110.129:3000/getcheckin').subscribe((result) => {
        this.http.get<any>('http://20.188.110.129:3000/getmeaprofile').subscribe((result2) => {
          // console.log("checkin",result)
          let ontime = 0;
          let late = 0;
          let absence = result2.length;
          let overtime = 0;

          result.forEach(element => {
            // asyncForEach(result, async (element) => {




            if ((element.checkin).substring(0, 2) == "05" || (element.checkin).substring(0, 2) == "06" || ((element.checkin).substring(0, 2) == "07" && (element.checkin).substring(3, 5) <= 40)) {
              absence--;
              ontime++;
            }
            if (((element.checkin).substring(0, 2) == "07" && (element.checkin).substring(3, 5) > 41) || (element.checkin).substring(0, 2) >= "08") {
              absence--;
              late++;
            }
            if (((element.checkout).substring(0, 2) == "15" && (element.checkout).substring(3, 5) > 30) || (element.checkout).substring(0, 2) >= "16") {
              overtime++;
            }
            //console.log(neutral, happy, unhappy)
            // itemsProcessed++;
            // if (itemsProcessed === result.length) {

            // }


          });

          // res[0].data = [...res[0].data, [Date.parse(date_today.toString()), ontime]]
          // res[1].data = [...res[1].data, [Date.parse(date_today.toString()), late]]
          // res[2].data = [...res[2].data, [Date.parse(date_today.toString()), absence]]
          // res[3].data = [...res[3].data, [Date.parse(date_today.toString()), overtime]]

          res[0].data = [...res[0].data, [Date.parse(date_today.toString()), absence]]
          res[1].data = [...res[1].data, [Date.parse(date_today.toString()), ontime]]
          res[2].data = [...res[2].data, [Date.parse(date_today.toString()), overtime]]
          res[3].data = [...res[3].data, [Date.parse(date_today.toString()), late]]

          // this.dataemo = res
          this.stock2 = new StockChart({
            chart: {
              type: 'spline'
            },
            rangeSelector: {
              selected: 4
            },
            credits: {
              enabled: false
            },

            // exporting: {
            //   buttons: {
            //       contextButton: {
            //           menuItems: [{
            //               textKey: 'downloadXLS',
            //               onclick: function () {
            //                   this.downloadXLS();
            //               }
            //           }, {
            //               textKey: 'downloadCSV',
            //               onclick: function () {
            //                   this.downloadCSV();
            //               }
            //           }]
            //       }
            //   }
            // },

            yAxis: {
              // labels: {
              //   formatter: function () {
              //     return (this.value > 0 ? ' + ' : '') + this.value + '%';
              //   }
              // },
              plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
              }]
            },
            xAxis: {
              type: 'datetime',
              gridLineWidth: 1,
              labels: {
                style: {
                  fontSize: '12px'
                }
              }
            },
            plotOptions: {
              series: {
                // compare: 'percent',
                showInNavigator: true
              }
            },

            tooltip: {
              // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              // valueDecimals: 2,
              split: true
            },
            legend: {
              enabled: true
            },
            colors: ['#53A9F2', '#FF6B4D', '#BFBFBD', '#4EC873'],

            // series: [{ name: "Happy", data: []},
            // { name: "Happy", data: []},
            // { name: "Happy", data: []}]
            series: res
          });
        });
      });
    })
    console.log("profile2");
    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/').subscribe((topdata) => {
        profile.forEach((element) => {

          if (topdata[element.id] == null) {
            element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
          } else {
            element['topdata'] = topdata[element.id];
          }


        })
        profile.sort((a, b) => (b.topdata.total - a.topdata.total));
        this.topdata = profile;
        console.log("profile", profile);
      })
    })
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
  //     this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/' + this.from + "/" + this.to).subscribe((topdata) => {
  //       profile.forEach((element) => {

  //         if (topdata[element.id] == null) {
  //           element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
  //         } else {
  //           element['topdata'] = topdata[element.id];
  //         }


  //       })
  //       profile.sort((a, b) => (b.topdata.total - a.topdata.total));
  //       this.topdata = profile;
  //       console.log("profile", profile);
  //     })
  //   })
  // }

  myForm;

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private http: HttpClient, private router: Router) {


    var date_ob = new Date();
    date_ob.setDate(date_ob.getDate() - 1);
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

    var to = year + ("0" + month).slice(-2) + ("0" + date).slice(-2);


    var from = year2 + ("0" + month2).slice(-2) + ("0" + date2).slice(-2);

    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/' + from + "/" + to).subscribe((topdata) => {
        profile.forEach((element) => {

          if (topdata[element.id] == null) {
            element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
          } else {
            element['topdata'] = topdata[element.id];
          }


        })
        profile.sort((a, b) => (b.topdata.total - a.topdata.total));
        this.topdata = profile;
        console.log("profile", profile);
      })
    })



  }


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
      this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/' + from + "/" + to).subscribe((topdata) => {
        profile.forEach((element) => {

          if (topdata[element.id] == null) {
            element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
          } else {
            element['topdata'] = topdata[element.id];
          }


        })
        profile.sort((a, b) => (a.id - b.id));
        profile.sort((a, b) => (b.topdata.total - a.topdata.total));
        this.topdata = profile;
        console.log("profile", profile);
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

