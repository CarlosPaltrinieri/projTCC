import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslaterCustomModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule { }