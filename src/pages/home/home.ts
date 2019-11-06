import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { Service } from '../../app/service';
import { HomeService } from './home.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Service, HomeService]
})
export class HomePage {
  categories: any[];
  featured: any[];
  cartItems: any[];
  noOfItems: number;


  constructor(public navCtrl: NavController,
    public service: Service,
    public homeService: HomeService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
    if (this.cartItems != null) {
      this.noOfItems = this.cartItems.length;
    }

    this.service.getData()
      .subscribe((response: any) => {
        this.featured = response.featured;
      }, error => {
        this.showToaster(error.error.message, 4000);
      })
  }

  ionViewWillEnter() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
    if (this.cartItems != null) {
      this.noOfItems = this.cartItems.length;
    }
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    this.homeService.getCategories()
      .subscribe((response: any) => {
        this.categories = response;
        loader.dismiss();
      }, error => {
        loader.dismiss();
        this.showToaster(error.error.message, 4000);
      })

    this.homeService.getUpcomings()
      .subscribe(upcomings => {
      })
  }

  navigate(MenuId) {
    this.navCtrl.push("ProductListPage",
      { MenuId: MenuId }
    );
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

  showToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
