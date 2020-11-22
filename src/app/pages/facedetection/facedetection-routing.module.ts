import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacedetectionComponent} from './facedetection.component';
import { InfoComponent as s1 } from './info/info.component';
// import { NotificationComponent as t1 } from './notification/notification.component';




const routes: Routes = [{
  path: '',
  component: FacedetectionComponent,
  children: [
    {
      path: 'info',
      component: s1,
    },
    
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacedetectionRoutingModule { }

export const routedComponents = [
  FacedetectionComponent,
  s1
];
