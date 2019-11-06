import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RatingService } from './rating.service';


@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
  providers: [RatingService]
})
export class RatingPage {

  review: any = {
    menuItem: '',
    order: '',
    rating: '',
    comment: ''
  }
  itemId: '';
  index: '';
  orderId: '';
  reviews: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ratingService: RatingService,
    public toastCtrl: ToastController) {
    this.review.menuItem = this.navParams.get('itemId');
    this.review.order = this.navParams.get('orderId');
    let review = this.navParams.get('review');
    this.review.rating = review.rating;
    this.review.comment = review.comment;
  }


  onSubmit() {
    this.ratingService.submitReview(this.review)
      .subscribe((review: any) => {
        this.createToaster("Rating Done", 4000)
        this.review.comment = '';
        localStorage.setItem('orderId', JSON.stringify(this.review.order));
        this.navCtrl.pop();
      }, error => {
        this.createToaster(error.error.message, 4000)
      })
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
