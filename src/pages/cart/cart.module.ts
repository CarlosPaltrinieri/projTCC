import { TranslaterCustomModule } from './../../app/translate.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';

@NgModule({
    declarations: [
        CartPage
    ],
    imports: [
        IonicPageModule.forChild(CartPage),
        TranslaterCustomModule
    ],
    exports: [
        CartPage
    ]
})
export class CartPageModule {
}
