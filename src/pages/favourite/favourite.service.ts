import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";


@Injectable()
export class FavouriteService {

  constructor(private http: HttpClient,
    public constService: ConstService) {
  }


  getFavourites(userId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/favourites/user/fav/', {
      headers: headers
    });
  }

  removeFromFavourite(productId) {
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


}
