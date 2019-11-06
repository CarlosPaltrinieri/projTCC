import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()

export class ProductDetailsService {
  constructor(public http: HttpClient, public constService: ConstService) {

  }

  getMenuItemDetails(menuItemId) {
    const headers = new HttpHeaders();
    return this.http.get(this.constService.base_url + 'api/menuItems/' + menuItemId, {
      headers: headers
    });
  }

  addToFavourite(productId) {
    let productInfo: any = {};
    productInfo.menuItem = productId;
    productInfo.userReaction = 'LIKE';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/favourites', productInfo, {
      headers: headers
    });
  }

  removeToFavourite(productId) {
    let productInfo: any = {};
    productInfo.menuItem = productId;
    productInfo.userReaction = 'DISLIKE';
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/favourites/delete/', productInfo, {
      headers: headers
    });
  }

  checkFavourite(productId) {
    let productInfo: any = {};
    productInfo.menuItem = productId;
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/favourites/check', productInfo, {
      headers: headers
    });
  }

}
