import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";


@Injectable()
export class CartService {

    constructor(private http: HttpClient,
        public constService: ConstService) {
    }


    getCoupons() {
        const headers = new HttpHeaders();
        return this.http.get(this.constService.base_url + 'api/coupons', {
            headers: headers
        });
    }

    getTaxSettingData() {
        const headers = new HttpHeaders();
        return this.http.get(this.constService.base_url + 'api/settings', {
            headers: headers
        });
    }








}