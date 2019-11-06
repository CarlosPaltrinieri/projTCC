import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";

@Injectable()
export class BookTableService {

  constructor(private http: HttpClient,
    public constService: ConstService) {
  }


  bookTable(tableInfo: any) {
    const body = JSON.stringify(tableInfo);
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/booktables', body, {
      headers: headers
    });
  }

}
