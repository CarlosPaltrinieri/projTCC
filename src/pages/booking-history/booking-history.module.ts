import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingHistoryPage } from './booking-history';

@NgModule({
  declarations: [
    BookingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingHistoryPage),
    TranslaterCustomModule
  ],
})
export class BookingHistoryPageModule { }
