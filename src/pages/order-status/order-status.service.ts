import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()

export class OrderStatusService {
  constructor(public http: HttpClient, public constService: ConstService) {

  }

  getStatus(orderId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/orders/user/status/' + orderId, {
      headers: headers
    });
  }

}
