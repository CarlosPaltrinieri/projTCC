import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstService } from "../providers/const-service";


@Injectable()
export class Service {
  constructor(private http: HttpClient, public constService: ConstService) {
  }
  getData() {
    return this.http.get('assets/json/restaurantAppJson.json');
  }

  getSettingsData() {
    const headers = new HttpHeaders();
    return this.http.get(this.constService.base_url + 'api/settings', {
      headers: headers
    });
  }

}

//local-path-->'assets/json/restaurantAppJson.json'
//remote -->'https://s3-us-west-2.amazonaws.com/ionicfirebaseapp.com/restaurantAppJson.json'





