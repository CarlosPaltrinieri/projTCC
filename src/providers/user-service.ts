import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "./const-service";

@Injectable()

export class UserService {
    constructor(public http: HttpClient, public constService: ConstService) {
    }

    getUser() {
        let authtoken = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/me', {
            headers: headers
        });
    }

}
