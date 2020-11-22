import { Component, Input } from '@angular/core';
// import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AES } from 'crypto-js';
import { NgxSpinnerService } from "ngx-spinner";
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const httpHeaders2 = new HttpHeaders({
  // 'Content-Type' : 'multipart/form-data'
});
const options = {
  headers: httpHeaders
};


// import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
// interface TreeNode<T> {
//   data: T;
//   children?: TreeNode<T>[];
//   expanded?: boolean;
// }

// interface FSEntry {
//   name: string;
//   size: string;
//   kind: string;
//   items?: number;
// }



@Component({
  selector: 'ngx-inserttable',
  templateUrl: './inserttable.component.html',
  styleUrls: ['./inserttable.component.scss'],
})
export class TreeGridComponent {
  // customColumn = 'name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  // allColumns = [ this.customColumn, ...this.defaultColumns ];

  // dataSource: NbTreeGridDataSource<FSEntry>;

  // sortColumn: string;
  // sortDirection: NbSortDirection = NbSortDirection.NONE;

  // constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
  //   this.dataSource = this.dataSourceBuilder.create(this.data);
  // }

  // updateSort(sortRequest: NbSortRequest): void {
  //   this.sortColumn = sortRequest.column;
  //   this.sortDirection = sortRequest.direction;
  // }

  // getSortDirection(column: string): NbSortDirection {
  //   if (this.sortColumn === column) {
  //     return this.sortDirection;
  //   }
  //   return NbSortDirection.NONE;
  // }

  // private data: TreeNode<FSEntry>[] = [
  //   {
  //     data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
  //     children: [
  //       { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
  //       { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
  //       { data: { name: 'project-3', kind: 'txt', size: '466 KB' } },
  //       { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
  //     ],
  //   },
  //   {
  //     data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
  //     children: [
  //       { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
  //       { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
  //     ],
  //   },
  //   {
  //     data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
  //     children: [
  //       { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
  //       { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
  //     ],
  //   },
  // ];


  // getShowOn(index: number) {
  //   const minWithForMultipleColumns = 400;
  //   const nextColumnStep = 100;
  //   return minWithForMultipleColumns + (nextColumnStep * index);
  // }
  items;
  checkoutForm;
  imageFile: File
  titles;


  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    // private blob: BlobService,
    // private Config: UploadParams = {
    //   sas: '?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-03-12T13:54:45Z&st=2020-03-12T05:54:45Z&spr=https&sig=LU0kQzzSgGKBEE6n4jsx0la7P%2BKdPYW%2FNstCz%2BhppZY%3D',
    //   storageAccount: 'oneteamblob',
    //   containerName: 'meapicture'
    // }

  ) {
    this.titles = ['นาย', 'นาง', 'น.ส.']
    this.checkoutForm = this.formBuilder.group({
      id: '',
      title: 'นาย',
      name: '',
      surname: '',
      email: '',
      position: ''
    });
  }


  onSubmit(customerData) {
    this.spinner.show();
    let formData: any = new FormData();

    formData.append('photo', this.imageFile);
    let options2 = {
      // method: 'POST',
      // body: formData,
      headers: httpHeaders2,
    };
    let ext = this.imageFile.name.split('.').pop()

    customerData.image = "https://oneteamblob.blob.core.windows.net/meapicture/" + customerData.id + "." + ext;
    this.checkoutForm.reset();
    console.log(customerData.name)
    this.http.post<any>('http://20.188.110.129:3000/uploadid/' + customerData.id + '/' + ext, {}).subscribe(uploadid =>
      this.http.post<any>('http://20.188.110.129:3000/upload', formData, options2).subscribe(upload =>
        this.http.post<any>('http://20.188.110.129:3000/posttrainimage', '{"id": "' + customerData.id + '","imageUrl": "' + customerData.image + '" }', options).subscribe(async (az1) => {
          customerData.faceid = await az1.personId;
          const reader = new FileReader();
          reader.readAsDataURL(this.imageFile);
          reader.onload = async () => {
            // console.log("reader",reader.result);
            // var ciphertext2 = AES.encrypt(reader.result, 'meaprofilepic').toString(enc.Utf8)
            var text = await reader.result.toString().substring(23);
            customerData.encimage = await AES.encrypt(text, 'meaprofilepic').toString();
            this.http.post<any>('http://20.188.110.129:3000/postmeaprofile', customerData, options).subscribe(done => //console.log(done)
              // console.log(az1)
              this.http.post<any[]>('http://20.188.110.129:3000/adddefault', '{"url":"' + customerData.image + '", "id":"' + customerData.id + '"}', options).subscribe((adddefault) => {
                this.http.post<any>('http://20.188.110.129:3000/insertsqlprofile/'+customerData.id, customerData, options).subscribe(done => {//console.log(done)

                  this.spinner.hide();
                  this.router.navigate(['/pages/tables/table'])
                })
              })

            )
            // });

          }
        }
        )
      )
    );


    // let a = this.http.post<any>('http://20.188.110.129:3000/postmeaprofile',customerData,options).subscribe(hero => console.log(hero));

    // if (this.imageFile !== null) {
    //   const baseUrl = this.blob.generateBlobUrl(this.Config, this.imageFile.name);
    //   let config = {
    //     baseUrl: baseUrl,
    //     sasToken: this.Config.sas,
    //     blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
    //     file: this.imageFile,
    //     complete: () => {
    //       console.log('Transfer completed !');
    //     },
    //     error: (err) => {
    //       console.log('Error:', err);
    //     },

    //   };
    //   this.blob.upload(config);
    // }

    // console.warn('Your order has been submitted', customerData);
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0]
  }


}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
