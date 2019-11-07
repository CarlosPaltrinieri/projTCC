import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';
import { BrMaskerModule } from 'br-mask';


@NgModule({
  declarations: [
    RegistrationPage
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
    TranslaterCustomModule,
    BrMaskerModule
  ],
  exports: [
    RegistrationPage
  ]
})
export class RegistrationPageModule { }