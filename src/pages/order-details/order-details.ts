import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { Service } from '../../app/service';
import { OrderDetailsService } from './order-details.service';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
  providers: [OrderDetailsService]

})
export class OrderDetailsPage {
  orderId: '';
  orderDetails: any = {};
  private review: any = {};
  private loader: any;
  public currency: any;
  public currencyDisplay;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public service: Service,
    public orderDetailsService: OrderDetailsService,
    public toastCtrl: ToastController) {
    this.currencyDisplay = localStorage.getItem('currency');
    if (this.navParams.get('orderId') != null) {
      this.orderId = this.navParams.get('orderId');
    } else {
      if (localStorage.getItem('orderId') != null) {
        this.orderId = JSON.parse(localStorage.getItem('orderId'));
      }
    }
    this.currency = localStorage.getItem('currency');
  }


  ionViewDidEnter() {
    this.loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    this.loader.present();
    this.orderDetailsService.getOrderDetails(this.orderId)
      .subscribe(order => {
        this.orderDetails = order;
        this.loader.dismiss();
      }, error => {
        this.loader.dismiss();
        this.showToaster(error.error.message, 4000);
      })

  }

  // private getReviews() {
  //   this.orderDetailsService.getRating(this.orderId)
  //     .subscribe(review => {
  //       this.review = review;
  //       this.loader.dismiss();
  //     }, error => {
  //       this.showToaster(error.message, 4000);
  //     })
  // }

  // private getRatings() {
  //   for (let i = 0; i < this.orderDetails.cart.length; i++) {
  //     for (let j = 0; j < this.review.length; j++) {
  //       if (this.orderDetails.cart[i].productId == this.review[j].menuItem) {
  //         this.orderDetails.cart[i].rating = this.review[j].rating;
  //         this.orderDetails.cart[i].ratingFlag = 1;
  //         this.orderDetails.cart[i].comment = this.review[j].comment;
  //       }
  //     }
  //   }
  // }

  rate(itemId) {
    this.navCtrl.push("RatingPage", {
      itemId: itemId,
      orderId: this.orderId,
      review: this.review
    });
  }

  trackOrder() {
    this.navCtrl.push("OrderStatusPage",
      { orderId: this.orderId });
  }

  buyAgain(productId) {
    this.navCtrl.push("ProductDetailsPage", {
      productId: productId
    })
  }

  showToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
