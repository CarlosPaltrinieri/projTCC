import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()

export class SettingsService {
  constructor(public http: HttpClient, public constService: ConstService) {

  }

  updateUserInfo(userId, userInfo) {
    let body = userInfo;
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken)
      .set('Content-Type', 'application/json');
    return this.http.put(this.constService.base_url + 'api/users/' + userId, body, {
      headers: headers
    });
  }

}
