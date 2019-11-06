import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    LocationPage
  ],
  imports: [
    TranslaterCustomModule,
    IonicPageModule.forChild(LocationPage),
    //   AgmCoreModule.forRoot({
    //    apiKey: 'AIzaSyDkIzaOmzxf0hm5Qd9h7YeEMtD5Iz_hpbY'
    // }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9QKBcDPx-r1y23IHE-Wf3ZjNZZJ1I6H4'
    })
  ],
  exports: [
    LocationPage
  ]
})
export class LocationPageModule { }