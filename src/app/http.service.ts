import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'http://www.omdbapi.com/';
  apiKey = '?apikey=f79aeba3';
  apiParam = '&s=';
  endpointUrl = this.apiUrl + this.apiKey + this.apiParam

  constructor(private http: HttpClient) { }

  getSearchResults(urlParam) {
    return this.http.get(this.endpointUrl + urlParam);
  }
}
