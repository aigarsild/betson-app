import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class HttpService {
  apiUrl = 'https://www.omdbapi.com/';
  apiKey = '?apikey=f79aeba3';

  endpointUrl = this.apiUrl + this.apiKey;

  constructor(private http: HttpClient) { }

  getApiCall(urlParam) {
    return this.http.get(this.endpointUrl + urlParam);
  }

  cleanParams(decodeUrl, removeParam) {
    //Clean up params taken from URL
    let queryString = '';
    decodeUrl ? queryString = decodeURI(decodeUrl) : '';

    if (!removeParam) {
      return queryString;
    }

    return queryString.replace(removeParam, '');
  }
}
