import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { of, fromEvent } from "rxjs";
import { debounceTime, map, distinctUntilChanged,filter } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  searchResults: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  getSearchValue(name) {
    this.searchValue = name;
    this.searchResultsCall();
  }

  searchResultsCall() {
      this._http.getSearchResults(this.searchValue).subscribe(data => {
          this.searchResults = data.Search;
          console.log(this.searchResults);
      });
  }

}
