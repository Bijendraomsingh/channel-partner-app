import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  baseUrl = "https://nweb.techjockey.com/channelpartnerapi";
  //baseUrl = "localhost/new_web/channelpartnerapi/";
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  constructor(private httpClient: HttpClient) { }
  get_data(cotroller: string) {
    return this.httpClient.get(this.baseUrl + '/' + cotroller);
  }
  post_data(cotroller: string, data: any) {
    return this.httpClient.post(this.baseUrl + '/' + cotroller, data, this.httpOptions);
  }
}
