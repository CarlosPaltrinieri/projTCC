import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableBookingPage } from './table-booking';

@NgModule({
  declarations: [
    TableBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(TableBookingPage),
    TranslaterCustomModule
  ],
})
export class TableBookingPageModule { }
