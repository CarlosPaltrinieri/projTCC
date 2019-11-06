import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";


@Injectable()
export class OrderDetailsService {

  constructor(private http: HttpClient,
    public constService: ConstService) {
  }


  getOrderDetails(orderId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/orders/' + orderId, {
      headers: headers
    });
  }

  getRating(orderId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/ratings/' + orderId, {
      headers: headers
    });
  }


}
