import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslaterCustomModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }