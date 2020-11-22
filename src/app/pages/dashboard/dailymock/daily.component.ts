import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Color} from 'ng2-charts';
// import { LocalDataSource } from 'ng2-smart-table';

// import { SmartTableData } from '../../../@core/data/smart-table';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent {
  empcount: number = 42;
  ontimecount: number = 36;
  latecount: number = 4;
  ansentcount: number = 2;
  overtimecount: number = 0;
  malecount: number = 25;
  femalecount: number = 15;
  maleentrycount: number = 25;
  femaleentrycount: number = 15;
  maleexitcount: number = 25;
  femaleexitcount: number = 25;
  public happy = [];
  public unhappy = [];
  public nuetural = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [

    { data: [16, 1, 1, 0, 0, 0, 0, 0], label: 'Happy' },
    // { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Neutral' },
    { data: [-30, -2, 0, 0, 0, 0, 0, 0], label: 'Unhappy' }
  ];

  public ChartLabels = ['20-29', '30-39', '40-49', '50-59', '60+'];

  public maleBarChartData = [

    { data: [5, 0, 16, 0, 0, 0, 0, 0], label: 'Happy' },
    { data: [4, 0, 0, 2, 0, 0, 0, 0], label: 'Neutral' },
    { data: [4, 8, 0, 0, 0, 0, 0, 0], label: 'Unhappy' }
  ];

  public femaleBarChartData = [

    { data: [5, 0, 16, 0, 0, 0, 0, 0], label: 'Happy' },
    { data: [1, 0, 0, 2, 0, 0, 0, 0], label: 'Neutral' },
    { data: [4, 8, 0, 0, 0, 0, 0, 0], label: 'Unhappy' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#2993d9' },
    // { backgroundColor: '#adadaa' },
    { backgroundColor: '#d93229' },
  ]
  public barChartColors2: Color[] = [
    { backgroundColor: '#2993d9' },
    { backgroundColor: '#adadaa' },
    { backgroundColor: '#d93229' },
  ]

  constructor(private http: HttpClient, private router: Router) {

    // this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((res) => {  })
    // this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    //   .filter(icon => icon.indexOf('outline') === -1);
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
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
