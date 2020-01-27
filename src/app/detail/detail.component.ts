import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  paramName = this.route.snapshot.params.id;
  apiParam: string = '&t=';
  searchContent: Object;
  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private _http: HttpService) { }

  ngOnInit() {
      this.searchDetailContent();
  }

  greateApiUrl() {
      if (!this.apiParam || !this.paramName) {
          return false;
      }

      return this.apiParam + this.paramName;
  }

  searchDetailContent() {
      let apiUrl = this.greateApiUrl();
      if (!apiUrl) {
          return;
      }

      this._http.getApiCall(apiUrl).subscribe(data => {
          if (data['Error']) {
              this.errorMsg = data['Error'];
              return;
          }
          this.errorMsg = '';
          this.searchContent = data;
      });
  }

}
