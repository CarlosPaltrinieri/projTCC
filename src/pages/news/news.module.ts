import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';


@NgModule({
  declarations: [
    NewsPage
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    TranslaterCustomModule
  ],
  exports: [
    NewsPage
  ]
})
export class NewsPageModule { }