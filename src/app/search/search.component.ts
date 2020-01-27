import { Component, ViewChild, ElementRef, OnInit, HostListener } from "@angular/core";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
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

  showWarningMsg: string = '';
  showsearchValue: string = '';
  apiParam: string = '&s=';

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.getSearchUrlParams(event);
  }

  constructor(private _http: HttpService) { }

  ngOnInit() {
      this.searchInputActions();

      //If params exist in URL when refreshed or coming to the URL
      //insert them into search input and make get call
      if (window.location.search.includes(this.searchParam) ) {
          this.insertSearchParamsIntoSearch(
              this._http.cleanParams(window.location.search, this.searchParam)
          );
      }
  }

  searchInputActions() {
      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
          // Get value
          map((event: any) => {
              return event.target.value;
          })
          // Time in milliseconds between key events
          ,debounceTime(750)
          // If previous query is diffent from current
          ,distinctUntilChanged(),
      ).subscribe((text: string) => {
          this.storeSearchValue(text);
          //On search push search params to URL and into history
          history.pushState(null, null, '?search=' + text);
      });
  }

  storeSearchValue(name) {
      // Show the search value in template
      this.showsearchValue = name;

      this.searchValue = this.apiParam + name;
      this.searchResultsCall();
  }

  searchResultsCall() {
      //Check if search param empty it means homepage,
      //clear warning and search, return for not to create empty call.
      if (this.searchValue === '&s=') {
          this.showWarningMsg = '';
          this.searchValue = '';
          return;
      }

      this._http.getApiCall(this.searchValue).subscribe(data => {
          if (data['Error']) {
              this.showWarningMsg = data['Error'];
              return;
          }

          this.showWarningMsg = '';
          this.searchResults = data['Search'];
      });
  }

  getSearchUrlParams(event) {
      this.insertSearchParamsIntoSearch(
      this._http.cleanParams(event.currentTarget.location.search, this.searchParam)
      );
  }

  insertSearchParamsIntoSearch(queryString) {
      this.searchInput.nativeElement.value = queryString;
      this.storeSearchValue(queryString);
  }
}
