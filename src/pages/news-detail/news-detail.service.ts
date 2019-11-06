import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";


@Injectable()
export class NewsDetailsService {

  constructor(private http: HttpClient,
    public constService: ConstService) {
  }


  getNewsDetails(newsId) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/news/' + newsId, {
      headers: headers
    });
  }


}
