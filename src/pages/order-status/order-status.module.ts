import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderStatusPage } from './order-status';

@NgModule({
  declarations: [
    OrderStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderStatusPage),
    TranslaterCustomModule
  ],
  exports: [
    OrderStatusPage
  ]
})
export class OrderStatusPageModule { }
