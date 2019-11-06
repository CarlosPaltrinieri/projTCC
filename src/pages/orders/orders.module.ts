import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';


@NgModule({
  declarations: [
    OrdersPage
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    TranslaterCustomModule
  ],
  exports: [
    OrdersPage
  ]
})
export class OrdersPageModule { }