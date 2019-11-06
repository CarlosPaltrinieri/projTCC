import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BookTableService } from './table-booking.service';


@IonicPage()
@Component({
  selector: 'page-table-booking',
  templateUrl: 'table-booking.html',
  providers: [BookTableService]
})

export class TableBookingPage {

  public bookingInfo: any = {
    //tableNumber:'',
    time: '',
    date: '',
    person: '',
    status: 'pending',
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private bookTableService: BookTableService
  ) {
  }


  onClickBookTable() {
    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.bookTableService.bookTable(this.bookingInfo)
      .subscribe((res: any) => {
        loader.dismiss();
        this.displayToast('Your table booked!', 4000);
        this.navCtrl.pop();
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

}
