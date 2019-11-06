import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BookingHistoryService } from './booking-history.service';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-booking-history',
  templateUrl: 'booking-history.html',
  providers: [BookingHistoryService]
})
export class BookingHistoryPage {

  public bookings: Array<{}>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private bookingHistoryService: BookingHistoryService,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.userService.getUser().subscribe((user: any) => {
      this.bookingHistoryService.getBookingHistory(user._id)
        .subscribe((res: any) => {
          this.bookings = res;
          loader.dismiss();
        }, error => {
          loader.dismiss();
          this.createToaster(error.message, 4000)
        })
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
