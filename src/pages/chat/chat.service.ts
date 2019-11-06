import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()

export class ChatService {
  constructor(public http: HttpClient, public constService: ConstService) {

  }

  getChatList(sellerId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/messages/user/' + sellerId, {
      headers: headers
    });
  }

  sendMessage(chatData) {
    const body = JSON.stringify(chatData);
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/messages/', body, {
      headers: headers
    });
  }

  getRestaurantInfo() {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/users/store/info', {
      headers: headers
    });
  }

}
