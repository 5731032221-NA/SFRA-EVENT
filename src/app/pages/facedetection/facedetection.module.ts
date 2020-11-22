import { NgModule } from '@angular/core';
import {NbSelectModule,NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { FacedetectionRoutingModule, routedComponents } from './facedetection-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { BlobModule } from 'angular-azure-blob-service';
import {NgxPaginationModule} from 'ngx-pagination';


import { MatDialogModule } from '@angular/material';
import {TrainComponent} from './train/train.component'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';

import {DeleteComponent} from './delete/deletet.component';
import {EditComponent} from './edit/edit.component'

@NgModule({
  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    FacedetectionRoutingModule,
    // Ng2SmartTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    NgxSpinnerModule,
    // BlobModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    ...routedComponents,
    TrainComponent,
    DeleteComponent,
    EditComponent
  ],
  entryComponents: [TrainComponent,DeleteComponent,EditComponent],
})
export class FacedetectionModule { }
