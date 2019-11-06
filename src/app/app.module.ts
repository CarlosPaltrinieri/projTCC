import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { Service } from '../app/service';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserModule } from "@angular/platform-browser";
import { ConstService } from '../providers/const-service';
import { UserService } from '../providers/user-service';
import { SocketService } from '../providers/socket-service';
import { HttpClientModule, HttpClient } from "@angular/common/http";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    exports: [BrowserModule, HttpClientModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Service,
        StatusBar,
        SplashScreen,
        ConstService,
        SocketService,
        UserService
    ]
})

export class AppModule { }