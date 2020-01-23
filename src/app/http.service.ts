import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'http://www.omdbapi.com/';
  apiKey = '?apikey=f79aeba3';

  endpointUrl = this.apiUrl + this.apiKey

  constructor(private http: HttpClient) { }

  getApiCall(urlParam) {
    return this.http.get(this.endpointUrl + urlParam);
  }

  cleanParams(decodeUrl, removeParam) {
      let queryString = decodeURI(decodeUrl);
      return queryString.replace(removeParam, '');
  }
}
