import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient,
    public constService: ConstService) {
  }


  createUser(user: any) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.constService.base_url + 'api/users', body, {
      headers: headers
    });
  }

}
