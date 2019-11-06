import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressListPage } from './address-list';
import { CustomHeaderPageModule } from '../custom-header/custom-header.module';

@NgModule({
  declarations: [
    AddressListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressListPage),
    CustomHeaderPageModule,
    TranslaterCustomModule
  ],
  exports: [
    AddressListPage
  ]
})
export class AddressListPageModule { }
