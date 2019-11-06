import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()

export class ProductListService {
  constructor(public http: HttpClient, public constService: ConstService) {

  }

  getMenuItems(categoryId) {
    const headers = new HttpHeaders();
    return this.http.get(this.constService.base_url + 'api/menuItems/by/category/' + categoryId, {
      headers: headers
    });
  }

}
