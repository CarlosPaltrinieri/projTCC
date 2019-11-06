import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutUsPage } from './about-us';

@NgModule({
    declarations: [
        AboutUsPage
    ],
    imports: [
        IonicPageModule.forChild(AboutUsPage),
        TranslaterCustomModule
    ],
    exports: [
        AboutUsPage
    ]
})
export class AboutUsPageModule {
}
