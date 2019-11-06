import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankyouPage } from './thankyou';


@NgModule({
  declarations: [
    ThankyouPage
  ],
  imports: [
    IonicPageModule.forChild(ThankyouPage),
    TranslaterCustomModule
  ],
  exports: [
    ThankyouPage
  ]
})
export class ThankyouPageModule { }