import { Component, ViewChild, ElementRef, OnInit, HostListener } from "@angular/core";
import { of } from "rxjs";
import {
    debounceTime,
    map,
    distinctUntilChanged,
    filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  searchResults: Object;
  searchParam: string = '?search=';

  apiParam: string = '&s=';

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        this.getSearchUrlParams(event);
    }

  constructor(private _http: HttpService) { }

  ngOnInit() {
        this.searchInputActions();

        if (window.location.search.includes(this.searchParam) ) {
            this.insertSearchParamsIntoSearch(
                this._http.cleanParams(window.location.search, this.searchParam)
            );
        }
  }

  searchInputActions() {
      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
          // get value
          map((event: any) => {
              return event.target.value;
          })
          // Time in milliseconds between key events
          ,debounceTime(500)
          // If previous query is diffent from current
          ,distinctUntilChanged()
      ).subscribe((text: string) => {
          this.storeSearchValue(text);
          //On search push search params to URL and into history
          history.pushState(null, null, '?search=' + text);
      });
  }

  storeSearchValue(name) {
    this.searchValue = this.apiParam + name;
    this.searchResultsCall();
  }

  searchResultsCall() {
      this._http.getApiCall(this.searchValue).subscribe(data => {
          this.searchResults = data.Search;
      });
  }

  getSearchUrlParams(event) {
      let queryString = decodeURI(event.currentTarget.location.search);
      this.insertSearchParamsIntoSearch(
          queryString.replace('?search=', '')
      );
  }

  insertSearchParamsIntoSearch(queryString) {
      this.searchInput.nativeElement.value = queryString;
      this.storeSearchValue(queryString);
  }

}
