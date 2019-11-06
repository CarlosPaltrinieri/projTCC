import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { NewsDetailsService } from './news-detail.service';


@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
  providers: [NewsDetailsService]
})
export class NewsDetailPage {
  newsId: '';
  newsDetails: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public newsService: NewsDetailsService,
    public toastCtrl: ToastController) {
    this.newsId = this.navParams.get('newsId');
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    this.newsService.getNewsDetails(this.newsId)
      .subscribe((response) => {
        this.newsDetails = response;
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
