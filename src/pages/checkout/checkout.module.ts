import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';


@NgModule({
    declarations: [
        CheckoutPage
    ],
    imports: [
        IonicPageModule.forChild(CheckoutPage),
        TranslaterCustomModule
    ],
    exports: [
        CheckoutPage
    ]
})
export class CheckoutPageModule {
}
