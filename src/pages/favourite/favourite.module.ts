import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritePage } from './favourite';


@NgModule({
  declarations: [
    FavouritePage
  ],
  imports: [
    IonicPageModule.forChild(FavouritePage),
    TranslaterCustomModule
  ],
  exports: [
    FavouritePage
  ]
})
export class FavouritePageModule { }