import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    ProductListPage
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    Ionic2RatingModule,
    TranslaterCustomModule
  ],
  exports: [
    ProductListPage
  ]
})
export class ProductListPageModule { }