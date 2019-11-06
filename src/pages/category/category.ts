import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { CategoryService } from './category.service';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers: [CategoryService]
})
export class CategoryPage {
  categories: any[] = [];

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public categoryService: CategoryService,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.categoryService.getCategories()
      .subscribe((categories: any) => {
        this.categories = categories;
        loader.dismiss();
      }, error => {
        loader.dismiss();
        this.createToaster(error.message, 4000)
      });
  }

  navigate(MenuId) {
    this.navCtrl.push("ProductListPage",
      { MenuId: MenuId }
    );
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
