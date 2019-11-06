import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { FavouriteService } from './favourite.service';


@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
  providers: [FavouriteService]
})
export class FavouritePage {
  favouriteItems: any[] = [];
  cartItems: any[] = [];
  noOfItems: number;
  bg: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public userService: UserService,
    public favouriteService: FavouriteService) {

    this.bg = 'assets/img/bg.jpg';
    this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
    if (this.cartItems != null) {
      this.noOfItems = this.cartItems.length;
    }
  }

  ngOnInit() {
    this.getWishlist();
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

  buyNow(productId) {
    this.navCtrl.push("ProductDetailsPage", {
      productId: productId
    });
  }


  isFavourite(): boolean {
    return this.favouriteItems.length == 0 ? false : true;
  }


  removeFromFavourites(productId) {
    let loader = this.loadingCtrl.create({
      content: 'please wait...'
    })
    loader.present();
    this.favouriteService.removeFromFavourite(productId)
      .subscribe(response => {
        loader.dismiss();
        this.createToaster('Removed from favourite List', 4000)
        this.getWishlist();
      }, error => {
        this.createToaster(error.message, 4000)
      })

  }

  getWishlist() {
    if (this.isLoggedin()) {
      let loader = this.loadingCtrl.create({
        content: 'please wait...'
      })
      loader.present();
      this.userService.getUser()
        .subscribe((user: any) => {
          this.favouriteService.getFavourites(user._id)
            .subscribe((response: any) => {
              this.favouriteItems = response;
              loader.dismiss();
            }, (error) => {
              loader.dismiss();
              this.createToaster(error.message, 4000)
            })
        })
    }
  }

  isLoggedin(): boolean {
    return localStorage.getItem('token') ? true : false;
  }


  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  home() {
    this.navCtrl.push("HomePage");
  }
}
