import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailsPage } from './product-details';

@NgModule({
  declarations: [
    ProductDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailsPage),
    TranslaterCustomModule
  ],
  exports: [
    ProductDetailsPage
  ]
})
export class ProductDetailsPageModule { }