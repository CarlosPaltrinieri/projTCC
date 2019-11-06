import { Component } from '@angular/core';
import { NavController, Events, NavParams, IonicPage, LoadingController, Platform, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { LoginService } from './login.service';
import { UserService } from '../../providers/user-service';
import { SocketService } from '../../providers/socket-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Facebook, GooglePlus, TwitterConnect, LoginService]
})
export class LoginPage {
  user: FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public events: Events,
    public fb: FormBuilder,
    public facebook: Facebook,
    public googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public twitter: TwitterConnect,
    public platform: Platform,
    public loginService: LoginService,
    public userService: UserService,
    public socketService: SocketService) {
  }

  onLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde'
    })
    loader.present();
    this.loginService.login(this.user.value)
      .subscribe((user: any) => {
        loader.dismiss();
        localStorage.setItem('token', "bearer " + user.token);
        if (this.navParams.get("flag") == 0) {
          this.navCtrl.setRoot("CartPage");
        } else {
          this.navCtrl.setRoot("HomePage");
          this.socketService.establishConnection();
          this.renderImage();
        }
      }, error => {
        loader.dismiss();
      })
  }

  ngOnInit(): any {
    this.user = this.fb.group({
      email: ['info@ionicfirebaseapp.com', Validators.required],
      password: ['123456', Validators.required],

    });
  }

  private renderImage() {
    this.userService.getUser()
      .subscribe((user: any) => {
        localStorage.setItem('uid', user._id);
        this.events.publish('imageUrl', user.imageUrl);
      }, error => {
        this.showToaster(error.error.message, 3000);
      });
  }


  doFbLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde'
    });
    loader.present();
    let permissions = [
      "public_profile",
      "email",
      "user_education_history",
      "user_friends"];
    this.facebook.login(permissions).then((res: FacebookLoginResponse) => {
      this.facebook.api("/me?fields=id,name,email,gender,first_name,last_name,picture.width(720).height(720).as(imageId)", permissions)
        .then(data => {
          console.log("fb data--", data);
          let userInfo = {
            id: data.id,
            name: data.name,
            email: data.email,
            imageId: data.imageId.data.url
          };
          this.loginService.loginUserViaFacebook(userInfo).subscribe((re: any) => {
            localStorage.setItem("token", "bearer " + re.token);
            console.log('api data-', re);
            loader.dismiss();
            this.events.publish("userInfo", {
              name: data.name,
              logo: data.imageId.data.url
            });
            this.showToaster("Login successful!", 3000);
            this.navCtrl.setRoot("HomePage");
          }, error => {
            loader.dismiss();
            console.log("Api Error in login via fb1", error);
            this.showToaster(error.message, 3000);
          })
        }, error => {
          loader.dismiss();
          console.log("Error in login via fb1", error);
          this.showToaster(error.message, 3000);
        });
    }, error => {
      loader.dismiss();
      console.log("Error in login via fb2", error);
      this.showToaster(error.message, 3000);
    });
  }

  googleLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde'
    });
    loader.present();
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '196286087108-9ioopkv6233l85lummmhhiivi3eg8i7q.apps.googleusercontent.com',
      'offline': true
    }).then((success) => {
      console.log("Login realizado com sucesso! " + JSON.stringify(success));
      const userInfo = {
        imageId: success.imageUrl,
        name: success.displayName,
        googleId: success.userId,
        email: success.email
      };
      this.loginService.loginUserViaGoogle(userInfo).subscribe((re: any) => {
        console.log('api res', re)
        localStorage.setItem("token", "bearer " + re.token);
        loader.dismiss();
        this.events.publish("userInfo", {
          name: success.displayName,
          logo: success.imageUrl
        });
        // localStorage.setItem('user', success.userId);
        this.showToaster("Logado com sucesso!", 3000);
        this.navCtrl.setRoot("HomePage");
      }, error => {
        loader.dismiss();
        console.log('Falha na tentativa de login: ', error);
        this.showToaster(error.message, 3000);
      })
    }, error => {
      loader.dismiss();
      console.log('Falha na tentativa de login: ', error);
      this.showToaster(error.messsage, 3000);
    });
  }

  Register() {
    this.navCtrl.push("RegistrationPage");
  }

  showToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
