import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OrderStatusService } from './order-status.service';

@IonicPage()
@Component({
  selector: 'page-order-status',
  templateUrl: 'order-status.html',
  providers: [OrderStatusService]
})
export class OrderStatusPage {
  orderId: string;
  status: any = {
    userNotification: []
  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public orderStatusService: OrderStatusService,
    public toastCtrl: ToastController) {

    this.orderId = this.navParams.get("orderId");
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.orderStatusService.getStatus(this.orderId)
      .subscribe(status => {
        this.status = status;
        loader.dismiss();
      }, error => {
        loader.dismiss();
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
