import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstService } from "../../providers/const-service";
import { URLSearchParams } from '@angular/http';

@Injectable()

export class CheckoutService {
  constructor(public http: HttpClient, public constService: ConstService) {
  }

  placeOrder(body) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/orders', body, {
      headers: headers
    });
  }

  chargeStripe(token, currency, amount, stripe_secret_key) {
    let secret_key = stripe_secret_key;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", "Bearer " + secret_key);
    var params = new HttpParams()
      .set("currency", currency)
      .set("amount", amount)
      .set("description", "description")
      .set("source", token);
    return new Promise(resolve => {
      this.http
        .post("https://api.stripe.com/v1/charges", params, {
          headers: headers
        })
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  savePaymentDetails(orderId, paymentDetails) {
    let body: any = {};
    body.payment = paymentDetails;
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.put(this.constService.base_url + 'api/orders/' + orderId, body, {
      headers: headers
    });
  }

  saveLoyaltyPoints(userId, loyaltyData) {
    let authtoken = localStorage.getItem('token');
    const body = loyaltyData;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.put(this.constService.base_url + 'api/users/' + userId, body, {
      headers: headers
    });
  }

  // save stripe card detail
  saveStripeCardDetail(body) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/users/stripe/card/info', body, {
      headers: headers
    });
  }

  stripePayment(body) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/users/stripe/payment', body, {
      headers: headers
    });
  }

  // stripe payemnt By saved card 

  stripePaymentBySavedCard(body) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/users/savedcard/stripe/payment', body, {
      headers: headers
    });
  }

  deleteSavedCard(body) {
    let authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authtoken);
    return this.http.post(this.constService.base_url + 'api/users/savedcard/delete/', body, {
      headers: headers
    });
  }

  getUserCardList(userId) {
    const headers = new HttpHeaders();
    return this.http.get(this.constService.base_url + 'api/users/card/info/data/' + userId, {
      headers: headers
    });
  }
}
