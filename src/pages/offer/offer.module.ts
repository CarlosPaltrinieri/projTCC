import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferPage } from './offer';

@NgModule({
  declarations: [
    OfferPage
  ],
  imports: [
    IonicPageModule.forChild(OfferPage),
    TranslaterCustomModule
  ],
  exports: [
    OfferPage
  ]
})
export class OfferPageModule { }