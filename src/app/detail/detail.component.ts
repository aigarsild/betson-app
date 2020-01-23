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

  constructor(private route: ActivatedRoute, private _http: HttpService) { }

  ngOnInit() {
      this.searchDetailContent();
  }

  greateApiUrl() {
      return this.apiParam + this.paramName;
  }

  searchDetailContent() {
      this._http.getApiCall(this.greateApiUrl()).subscribe(data => {
          this.searchContent = data;
          console.log(this.searchContent);
      });
  }

}
