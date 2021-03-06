import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { OfferService } from './offer.service';


@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  providers: [OfferService]
})
export class OfferPage {
  @ViewChild(Slides) slides: Slides;
  offerProducts: any[] = [];
  offerPrice: number;
  public currency: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private offerItemsService: OfferService) {
    this.currency = localStorage.getItem('currency');
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    this.offerItemsService.getMenuItems()
      .subscribe((menuItems: any) => {
        this.offerProducts = menuItems;
        loader.dismiss();
      },
        error => {
          loader.dismiss();
          this.createToaster(error.error.message, 4000)
        })
  }

  gotoNextSlide() {
    this.slides.slideNext();
  }

  gotoPrevSlide() {
    this.slides.slidePrev();
  }

  buyNow(productId) {
    this.navCtrl.push("ProductDetailsPage", {
      productId: productId
    });
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
