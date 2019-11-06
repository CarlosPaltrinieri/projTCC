import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstService } from "../../providers/const-service";


@Injectable()
export class AddressService {

    constructor(private http: HttpClient,
        public constService: ConstService) {
    }


    addAddress(body) {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authtoken);
        return this.http.post(this.constService.base_url + 'api/addresses/', JSON.stringify(body), {
            headers: headers
        })

    }

    updateAddress(addressId, address) {
        const body = address;
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authtoken);
        return this.http.put(this.constService.base_url + 'api/addresses/' + addressId + '/', JSON.stringify(body), {
            headers: headers
        });
    }

    getAddressById(addressId) {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/addresses/' + addressId, {
            headers: headers
        });
    }






}