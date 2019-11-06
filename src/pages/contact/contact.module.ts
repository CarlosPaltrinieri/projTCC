import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';


@NgModule({
  declarations: [
    ContactPage
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    TranslaterCustomModule
  ],
  exports: [
    ContactPage
  ]
})
export class ContactPageModule { }