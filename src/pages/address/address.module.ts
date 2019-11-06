import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPage } from './address';

@NgModule({
  declarations: [
    AddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
    TranslaterCustomModule
  ],
  exports: [
    AddressPage
  ]
})
export class CheckoutPageModule { }
