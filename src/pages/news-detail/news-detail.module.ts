import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailPage } from './news-detail';


@NgModule({
  declarations: [
    NewsDetailPage
  ],
  imports: [
    IonicPageModule.forChild(NewsDetailPage),
    TranslaterCustomModule
  ],
  exports: [
    NewsDetailPage
  ]
})
export class NewsDetailPageModule { }