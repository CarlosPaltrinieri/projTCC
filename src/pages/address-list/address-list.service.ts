import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()
export class AddressListService {

    constructor(private http: HttpClient,
        public constService: ConstService) {
    }


    getAddressList() {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/addresses/user', {
            headers: headers
        });
    }

    getAvailablePincodes() {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/pincodes', {
            headers: headers
        });
    }

    getLoyaltyStatus() {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/settings', {
            headers: headers
        });
    }

    // delete address
    deleteAdressData(addressId) {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken)
        return this.http.delete(this.constService.base_url + 'api/addresses/' + addressId, {
            headers: headers
        });
    }





}