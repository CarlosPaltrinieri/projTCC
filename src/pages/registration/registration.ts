import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { RegistrationService } from './registration.service';
import { SocketService } from '../../providers/socket-service';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [Facebook, GooglePlus, TwitterConnect, RegistrationService]
})
export class RegistrationPage {
  user: FormGroup;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public fb: FormBuilder,
    public facebook: Facebook,
    public googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public twitter: TwitterConnect,
    public platform: Platform,
    public registrationService: RegistrationService,
    public socketService: SocketService) {
  }

  onRegister() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde'
    })
    loader.present();
    this.registrationService.createUser(this.user.value)
      .subscribe((user: any) => {
        loader.dismiss();
        localStorage.setItem('token', "bearer " + user.token);
        this.navCtrl.setRoot("HomePage");
        this.socketService.establishConnection();
        this.displayToast('Usuário registrado com sucesso!', 5000);
      }, error => {
        loader.dismiss();
      })
  }

  displayToast(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  ngOnInit(): any {
    this.user = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      birth: ['', Validators.required],
      secondName: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  navLogin() {
    this.navCtrl.push("LoginPage");
  }

  doFbLogin() {
      let permissions = new Array();
      permissions = ["public_profile", "email", "user_education_history"];
      this.facebook.login(permissions)
          .then((success) => {
              this.facebook.api("/me?fields=id,name,email,gender,first_name,last_name", permissions).then((user) => {
                  //here post data to Api
                  localStorage.setItem('token', user.id);
                  this.displayToast('User Successfully registered!', 5000);
                  this.navCtrl.setRoot("HomePage");
              }),
                  (error) => {
                      console.log(JSON.stringify(error));
                  }

          }, error => {
              console.log("FaceBook ERROR : ", JSON.stringify(error));
              this.displayToast(error, 5000);
          })
  }

  googleLogin() {
      this.googlePlus.login({
          'scopes': '',
          'webClientId': '557859355960-r2petg57jjsomcvkbs0bc4401n57l9ja.apps.googleusercontent.com',
          'offline': true
      })
          .then((success) => {
              //here post data to Api
              localStorage.setItem('token', success.userId);
              this.displayToast('User Successfully registered!', 5000);
              this.navCtrl.setRoot("HomePage");
          },
          (error) => {
              console.log('error' + JSON.stringify(error));
              this.displayToast(error, 5000);
          })
  }

  // twitterLogin() {
  //     this.platform.ready().then((res) => {
  //         if (res == 'cordova') {
  //             this.twitter.login().then((result) => {
  //                 this.twitter.showUser().then((user) => {
  //                     //here post data to Api
  //                     localStorage.setItem('token', user.id);
  //                     this.displayToast('User Successfully registered!', 5000);
  //                     this.navCtrl.setRoot("HomePage");
  //                 },
  //                     (onError) => {
  //                         console.log("user" + JSON.stringify(onError));
  //                         this.displayToast(onError, 5000);
  //                     })
  //             })
  //         }
  //     })
  // }


}
