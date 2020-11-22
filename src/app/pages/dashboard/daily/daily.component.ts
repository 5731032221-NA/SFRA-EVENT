import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Label, Color } from 'ng2-charts';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeComponent } from './popup/employee/employee.component'
import { AbsentComponent } from './popup/absent/absent.component'
import { LateComponent } from './popup/late/late.component'
import { OntimeComponent } from './popup/ontime/ontime.component'
import { OvertimeComponent } from './popup/overtime/overtime.component'
import { EmoComponent } from './popup/emo/emo.component'
import { ThrowStmt } from '@angular/compiler';

// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent {

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];


  empcount: number = 0;
  ontimecount: number = 0;
  latecount: number = 0;
  ansentcount: number = 0;
  overtimecount: number = 0;
  malecount: number = 0;
  femalecount: number = 0;
  maleentrycount: number = 0;
  femaleentrycount: number = 0;
  maleexitcount: number = 0;
  femaleexitcount: number = 0;
  maleavgwalkin: string = "--:--";
  maleavgwalkout: string = "--:--";
  femaleavgwalkin: string = "--:--";
  femaleavgwalkout: string = "--:--";

  emoicon: string = "all";

  bestemp: string = " ";
  happyperson: string = " ";
  mealover: string = " ";
  // rate: number = 3;

  mealovershow: boolean = false;
  bestempshow: boolean = false;
  happypersonshow: boolean = false;

  bestempimg: string = "";
  happypersonimg: string = "";
  mealoverimg: string = "";

  bestempname: string = " ";
  happypersonname: string = " ";
  mealovername: string = " ";

  bestempin: string = "--:--";
  mealoverin: string = "--:--";
  happyin: string = "--:--";

  bestempout: string = "--:--";
  mealoverout: string = "--:--";
  happyout: string = "--:--";

  bestemphour: string = "-";
  mealoverhour: string = "-";
  happyhour: string = "-";

  bestemphap: number = 0;
  mealoverhap: number = 0;
  happypersonhap: number = 0;

  happypersonpo: string = " ";
  bestemppo: string = " ";
  mealoverpo: string = " ";

  public happy = [];
  public unhappy = [];
  public nuetural = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true

  };

  public barChartOptions2 = {
    // scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    tooltips: {
      enabled: false,
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    hover: { mode: null },
    scales: {
      xAxes: [{
        stacked: true, display: false, gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        stacked: true, gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],

    }


    //   scales: {
    //     yAxis: [{
    //         ticks: {
    //             beginAtZero:true,
    //             min: 0,
    //             max: 100
    //         }
    //     }]
    // }
  };
  //public barChartLabels = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  public barChartLabels = ['05:00','06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [

    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Happy ' },
    // { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Neutral' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Unhappy ' }
  ];

  public ChartLabels = ['20-29', '30-39', '40-49', '50-59', '60+'];

  public maleBarChartData = [

    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Happy' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Neutral' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Unhappy' }
  ];

  public femaleBarChartData = [

    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Happy' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Neutral' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Unhappy' }
  ];

  public happbarType = 'horizontalBar';
  public happybardata = [{ data: [10] }, { data: [90] }];

  public barChartColors: Color[] = [
    { backgroundColor: 'rgba(255, 119, 1, 0.6)', borderColor: 'rgba(255, 119, 1, 0.9)', borderWidth: 0.8, hoverBackgroundColor: 'rgba(255, 119, 1, 0.75)', },
    { backgroundColor: 'rgba(125, 125, 125, 0.5)', borderColor: 'rgba(125, 125, 125, 0.9)', borderWidth: 0.8, hoverBackgroundColor: 'rgba(125, 125, 125, 0.75)' },
  ]


  public barChartColors1: Color[] = [
    { backgroundColor: 'rgba(22, 92, 188, 0.6)', borderColor: 'rgba(22, 92, 188, 0.9)', borderWidth: 0.8, hoverBackgroundColor: 'rgba(22, 92, 188, 0.9)' },

  ]

  public barChartColors2: Color[] = [
    { backgroundColor: 'rgba(235, 71, 70, 0.6)', borderColor: 'rgba(235, 71, 70, 0.9)', borderWidth: 0.8, hoverBackgroundColor: 'rgba(235, 71, 70, 0.9)' },

  ]

  public barChartColors3: Color[] = [
    { backgroundColor: 'rgba(235, 71, 70, 0.6)', borderColor: 'rgba(235, 71, 70, 0.9)', borderWidth: 0.8, hoverBackgroundColor: 'rgba(235, 71, 70, 0.9)' },

  ]

  public selectedVal: string;
  ngOnInit() {

    this.selectedVal = 'Overall';
  }

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("val", val)
    if (val == 'Overall') {
      this.emoicon = "all";
      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/male').subscribe((res) => {
        this.malecount = res.entry + res.exit;
        this.maleentrycount = res.entry;
        this.maleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.maleavgwalkin = "--:--";
        } else {
          this.maleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.maleavgwalkout = "--:--";
        } else {
          this.maleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })

      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/female').subscribe((res) => {
        this.femalecount = res.entry + res.exit;
        this.femaleentrycount = res.entry;
        this.femaleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.femaleavgwalkin = "--:--";
        } else {
          this.femaleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.femaleavgwalkout = "--:--";
        } else {
          this.femaleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })

      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/male').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.maleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });

      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/female').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.femaleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });
    } else if (val == 'Happy') {
      this.emoicon = "happy";
      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/male/happy').subscribe((res) => {
        console.log(res);
        this.malecount = res.entry + res.exit;
        this.maleentrycount = res.entry;
        this.maleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.maleavgwalkin = "--:--";
        } else {
          this.maleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.maleavgwalkout = "--:--";
        } else {
          this.maleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })

      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/female/happy').subscribe((res) => {
        console.log(res);
        this.femalecount = res.entry + res.exit;
        this.femaleentrycount = res.entry;
        this.femaleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.femaleavgwalkin = "--:--";
        } else {
          this.femaleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.femaleavgwalkout = "--:--";
        } else {
          this.femaleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })
      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/male/happy').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.maleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });

      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/female/happy').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.femaleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });
    } else if (val == 'Unhappy') {
      this.emoicon = "unhappy";
      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/male/unhappy').subscribe((res) => {
        console.log(res);
        this.malecount = res.entry + res.exit;
        this.maleentrycount = res.entry;
        this.maleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.maleavgwalkin = "--:--";
        } else {
          this.maleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.maleavgwalkout = "--:--";
        } else {
          this.maleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })

      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/female/unhappy').subscribe((res) => {
        console.log(res);
        this.femalecount = res.entry + res.exit;
        this.femaleentrycount = res.entry;
        this.femaleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.femaleavgwalkin = "--:--";
        } else {
          this.femaleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.femaleavgwalkout = "--:--";
        } else {
          this.femaleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })
      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/male/unhappy').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.maleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });

      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/female/unhappy').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.femaleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });


    } else if (val == 'Neutral') {
      this.emoicon = "neutral";
      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/male/neutral').subscribe((res) => {
        this.malecount = res.entry + res.exit;
        this.maleentrycount = res.entry;
        this.maleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.maleavgwalkin = "--:--";
        } else {
          this.maleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.maleavgwalkout = "--:--";
        } else {
          this.maleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })

      this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/female/neutral').subscribe((res) => {
        this.femalecount = res.entry + res.exit;
        this.femaleentrycount = res.entry;
        this.femaleexitcount = res.exit;
        let ihh = Math.floor(res.entryhh / parseInt(res.entry));
        let imm = parseInt((ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry)).toFixed(0))
  
        let ohh = Math.floor(res.exithh / parseInt(res.exit));
        let omm = parseInt((ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit)).toFixed(0))
        if (res.entry == 0) {
          this.femaleavgwalkin = "--:--";
        } else {
          this.femaleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
        }
        if (res.exit == 0) {
          this.femaleavgwalkout = "--:--";
        } else {
          this.femaleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        }
      })
      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/male/neutral').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.maleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });

      this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/female/neutral').subscribe((res) => {
        // this.happy = [];
        let resdata = [];
        // this.nuetural = [];
        console.log(res)
        res.forEach((element) => {
          resdata.push(element.count);

        })
        this.femaleBarChartData = [
          { data: resdata, label: 'Count' }
        ];

      });



    }
  }

  emoDialog(gender): void {
    const dialogRef = this.dialog.open(EmoComponent, {
      width: '820px',
      data: { emo: this.selectedVal, gender: gender }
    });
    // dialogRef.afterClosed().subscribe(result => {
    // this.email = result;
    // });
  }

  empDialog(): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '600px',
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    // this.email = result;
    // });
  }

  absentDialog(): void {
    const dialogRef = this.dialog.open(AbsentComponent, {
      width: '600px',
      data: {}
    });

  }
  lateDialog(): void {
    const dialogRef = this.dialog.open(LateComponent, {
      width: '700px',
      data: {}
    });

  }
  ontimeDialog(): void {
    const dialogRef = this.dialog.open(OntimeComponent, {
      width: '700px',
      data: {}
    });

  }
  overtimeDialog(): void {
    const dialogRef = this.dialog.open(OvertimeComponent, {
      width: '700px',
      data: {}
    });

  }

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }

    this.http.get<any>('http://20.188.110.129:3000/countmeaprofile').subscribe((res) => { this.empcount = res; })
    this.http.get<any>('http://20.188.110.129:3000/getcountlate').subscribe((res) => {
      this.ontimecount = res.ontime;
      this.latecount = res.late;
      this.ansentcount = res.absence;
      this.overtimecount = res.overtime;
    })
    this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/male').subscribe((res) => {
      this.malecount = res.entry + res.exit;
      this.maleentrycount = res.entry;
      this.maleexitcount = res.exit;
      let ihh = Math.floor(res.entryhh / parseInt(res.entry));
      let imm = (ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry))

      let ohh = Math.floor(res.exithh / parseInt(res.exit));
      let omm = (ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit))

      if (res.entry == 0) {
        this.maleavgwalkin = "--:--";
      } else {
        this.maleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
      }
      if (res.exit == 0) {
        this.maleavgwalkout = "--:--";
        // console.log("zeroo");
      } else {
        this.maleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
        // console.log("wrong");
      }

    })

    this.http.get<any>('http://20.188.110.129:3000/getcountexitbygender/female').subscribe((res) => {
      this.femalecount = res.entry + res.exit;
      this.femaleentrycount = res.entry;
      this.femaleexitcount = res.exit;
      let ihh = Math.floor(res.entryhh / parseInt(res.entry));
      let imm = (ihh - Math.floor(ihh)) * 60 + Math.ceil(res.entrymm / parseInt(res.entry))

      let ohh = Math.floor(res.exithh / parseInt(res.exit));
      let omm = (ohh - Math.floor(ohh)) * 60 + Math.ceil(res.exitmm / parseInt(res.exit))
      if (res.entry == 0) {
        this.femaleavgwalkin = "--:--";
      } else {
        this.femaleavgwalkin = ("0" + (Math.floor(ihh) + Math.floor(imm / 60))).slice(-2) + ":" + ("0" + imm).slice(-2);
      }
      if (res.exit == 0) {
        this.femaleavgwalkout = "--:--";
      } else {
        this.femaleavgwalkout = ("0" + (Math.floor(ohh) + Math.floor(omm / 60))).slice(-2) + ":" + ("0" + omm).slice(-2);
      }

    })


    this.http.get<any>('http://20.188.110.129:3000/getemograph').subscribe((emotion) => {
      this.happy = [];
      this.unhappy = [];
      // this.nuetural = [];
      console.log(emotion)
      emotion.forEach((element) => {
        this.happy.push(element.happy);
        // this.unhappy.push(element.unhappy);
        this.unhappy.push((element.unhappy));
      })
      this.barChartData = [
        { data: this.happy, label: ':) Happy' },
        // {data: this.nuetural, label: 'Neutral'},
        { data: this.unhappy, label: ':( Unhappy' }
      ];

    });


    this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/male').subscribe((res) => {
      // this.happy = [];
      let resdata = [];
      // this.nuetural = [];
      // console.log(res)
      res.forEach((element) => {
        resdata.push(element.count);

      })
      this.maleBarChartData = [
        { data: resdata, label: 'Count' }
      ];

    });

    this.http.get<any>('http://20.188.110.129:3000/getgrapghagebygender/female').subscribe((res) => {
      // this.happy = [];
      let resdata = [];
      // this.nuetural = [];
      // console.log(res)
      res.forEach((element) => {
        resdata.push(element.count);

      })
      this.femaleBarChartData = [
        { data: resdata, label: 'Count' }
      ];

    });

    this.http.get<any>('http://20.188.110.129:3000/getdailyhappy').subscribe((gethappy) => {
      this.http.get<any>('http://20.188.110.129:3000/getdailyworktime').subscribe((getworktime) => {
        this.http.get<any>('http://20.188.110.129:3000/getmeaprofile').subscribe((getmeaprofile) => {
          this.http.get<any>('http://20.188.110.129:3000/getcheckin').subscribe((getcheckin) => {
            // this.happy = [];
            // let resdata = [];
            let bestemp = {};
            let happy = {};
            let MEAlover = {};
            let MEAlover2 = {};


            Object.keys(gethappy).forEach((element) => {
              if (happy[element] == null) happy[element] = gethappy[element];
              else happy[element] += gethappy[element];

              if (getworktime[element] > 480) {
                if (MEAlover[element] == null) MEAlover[element] = gethappy[element];
                else MEAlover[element] += gethappy[element];
              }

              if (MEAlover2[element] == null) MEAlover2[element] = gethappy[element];
              else MEAlover2[element] += gethappy[element];

            })

            Object.keys(getworktime).forEach((element) => {
              // if (bestemp[element] == null) bestemp[element] = getworktime[element];
              // else bestemp[element] += getworktime[element];
              bestemp[element] = getworktime[element];
              if (getworktime[element] > 480) {
                if (MEAlover[element] == null) MEAlover[element] = Math.abs(getworktime[element]) / 4.80;
                else MEAlover[element] += Math.abs(getworktime[element]) / 4.80;
              }

              if (MEAlover2[element] == null) MEAlover2[element] = Math.abs(getworktime[element]) / 4.80;
              else MEAlover2[element] += Math.abs(getworktime[element]) / 4.80;


            })

            var bestemphighestVal = Math.max.apply(null, Object.values(bestemp)),
              bestempval = Object.keys(bestemp).find(function (a) {
                return bestemp[a] === bestemphighestVal;
              });
            if (bestemphighestVal < 0) {
              var bestemphighestVal = Math.min.apply(null, Object.values(bestemp)),
                bestempval = Object.keys(bestemp).find(function (a) {
                  return bestemp[a] === bestemphighestVal;
                });
            }


            var happyhighestVal = Math.max.apply(null, Object.values(happy)),
              happyval = Object.keys(happy).find(function (a) {
                return happy[a] === happyhighestVal;
              });

            var MEAloverhighestVal = Math.max.apply(null, Object.values(MEAlover)),
              MEAloverval = Object.keys(MEAlover).find(function (a) {
                return MEAlover[a] === MEAloverhighestVal;
              });

            var MEAloverhighestVal2 = Math.max.apply(null, Object.values(MEAlover2)),
              MEAloverval2 = Object.keys(MEAlover2).find(function (a) {
                return MEAlover2[a] === MEAloverhighestVal2;
              });

            // console.log("Mealovve", MEAlover);
            // console.log("Mealovveval", MEAloverval2);

            getmeaprofile.forEach((element) => {
              // console.log("eiei")
              if (element.id == bestempval) {
                this.bestempname = element.name + " " + element.surname;
                this.bestemp = bestempval;
                // this.bestempimg = element.image;
                this.bestemppo = element.position;
                this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
                  // this.happy = [];
                  this.bestempimg = 'data:image/jpg;base64,' + res[0].encimage;


                });
              }
              if (element.id == happyval && happyhighestVal != 0) {
                this.happypersonname = element.name + " " + element.surname;
                this.happyperson = happyval;
                // this.happypersonimg = element.image;
                this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
                  // this.happy = [];
                  this.happypersonimg = 'data:image/jpg;base64,' + res[0].encimage;

                });
                this.happypersonpo = element.position;
              }
              if (element.id == MEAloverval) {
                this.mealovername = element.name + " " + element.surname;
                this.mealover = MEAloverval;
                // this.mealoverimg = element.image;
                this.mealoverpo = element.position;
                this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
                  // this.happy = [];
                  this.mealoverimg = 'data:image/jpg;base64,' + res[0].encimage;


                });
              }
              if (Object.keys(MEAlover).length === 0) {
                if (element.id == MEAloverval2) {
                  this.mealovername = element.name + " " + element.surname;
                  this.mealover = MEAloverval2;
                  // this.mealoverimg = element.image;
                  this.mealoverpo = element.position;
                  this.http.get<any>('http://20.188.110.129:3000/getmeaprofilebyid/' + element.id).subscribe((res) => {
                    // this.happy = [];
                    this.mealoverimg = 'data:image/jpg;base64,' + res[0].encimage;


                  });
                }
              }
            });
            // console.log("len", Object.keys(MEAlover).length === 0);
            getcheckin.forEach((element) => {
              if (element.id == bestempval) {
                this.bestempshow = true;
                this.bestempin = element.checkin;
                if (element.checkout === "") {
                  this.bestempout = "--:--";
                  this.bestemphour = "--";
                }
                else {
                  this.bestempout = element.checkout;
                  this.bestemphour = Math.floor(Math.abs(bestemphighestVal / 60)) + "." + ("0" + Math.abs((bestemphighestVal % 60))).slice(-2);
                }
                var hap = (element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 50;
                if (element.checkoutEmo != "") {
                  // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                  hap = (hap * 2 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                }
                if (hap > 100) hap = 100;
                this.bestemphap = parseInt(hap.toFixed(2));


              }



              if (Object.keys(MEAlover).length === 0) {
                if (element.id == MEAloverval2) {
                  this.mealovershow = true;
                  this.mealoverin = element.checkin;
                  // this.mealoverout = element.checkout;
                  if (element.checkout != "") {
                    this.mealoverout = element.checkout;
                    this.mealoverhour = Math.floor(Math.abs(getworktime[MEAloverval2] / 60)) + "." + ("0" + Math.abs((getworktime[MEAloverval2] % 60))).slice(-2);
                  }
                  else {
                    this.mealoverout = "--:--";
                    this.mealoverhour = "--"
                  }
                  var hap = (element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 50;
                  if (element.checkoutEmo != "") {
                    // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                    hap = (hap * 2 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                  }
                  if (hap > 100) hap = 100;
                  this.mealoverhap = parseInt(hap.toFixed(2));

                }
              } else {
                if (element.id == MEAloverval) {
                  this.mealovershow = true;
                  this.mealoverin = element.checkin;
                  // this.mealoverout = element.checkout;
                  if (element.checkout != "") {
                    this.mealoverout = element.checkout;
                    this.mealoverhour = Math.floor(Math.abs(getworktime[MEAloverval2] / 60)) + "." + ("0" + Math.abs((getworktime[MEAloverval2] % 60))).slice(-2);
                  }
                  else {
                    this.mealoverout = "--:--";
                    this.mealoverhour = "--"
                  }
                  // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;
                  var hap = (element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 50;
                  if (element.checkoutEmo != "") {
                    // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                    hap = (hap * 2 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                  }
                  if (hap > 100) hap = 100;
                  this.mealoverhap = parseInt(hap.toFixed(2));

                }
              }

              if (element.id == happyval) {
                this.happypersonshow = true;
                this.happyin = element.checkin;
                // this.happyout = element.checkout;
                if (element.checkout != "") {
                  this.happyout = element.checkout;
                  this.happyhour = Math.floor(Math.abs(getworktime[happyval] / 60)) + "." + ("0" + Math.abs((getworktime[happyval] % 60))).slice(-2);
                }
                else {
                  this.happyout = "--:--";
                  this.happyhour = "--";
                }
                // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;
                var hap = (element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 50;
                if (element.checkoutEmo != "") {
                  // let hap = ((element.checkinEmotion.emotion.happiness + element.checkinEmotion.emotion.surprise) * 100 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                  hap = (hap * 2 + (element.checkoutEmotion.emotion.happiness + element.checkoutEmotion.emotion.surprise) * 200) / 2;

                }
                if (hap > 100) hap = 100;
                this.happypersonhap = parseInt(hap.toFixed(2));

              }
            });
          });
          // console.log("bestemp", MEAloverval);
        });
      });
    });





  }
  // deleteRow(id){
  //   this.http.delete<any>('http://20.188.110.129:3000/deletemeaprofile/'+id,{}).subscribe((delet) => { 
  //     this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((res) => { })
  //    })

  // }
  // editRow(id){
  //   this.router.navigate(['/pages/tables/tree-grid2'], { queryParams:{id: id}});

  // }


}
