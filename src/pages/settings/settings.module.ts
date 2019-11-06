import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Settings } from './settings';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';


@NgModule({
  declarations: [
    Settings
  ],
  imports: [
    IonicPageModule.forChild(Settings),
    Ng2CloudinaryModule,
    FileUploadModule,
    TranslaterCustomModule

  ],
  exports: [
    Settings
  ]
})
export class SettingsModule { }