import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';


@NgModule({
  declarations: [
    RegistrationPage
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
    TranslaterCustomModule
  ],
  exports: [
    RegistrationPage
  ]
})
export class RegistrationPageModule { }