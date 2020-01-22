import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
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
  apiParam = '&s=';

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private _http: HttpService) { }

  ngOnInit() {

      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
          // get value
          map((event: any) => {
              return event.target.value;
          })
          // if character length greater then 2
          ,filter(res => res.length > 2)
          // Time in milliseconds between key events
          ,debounceTime(250)
          // If previous query is diffent from current
          ,distinctUntilChanged()
          // subscription for response
      ).subscribe((text: string) => {
          this.getSearchValue(text);
          history.pushState(null, null, '?' + text);
      });

  }

  getSearchValue(name) {
    this.searchValue = this.apiParam + name;
    this.searchResultsCall();
  }

  searchResultsCall() {
      this._http.getApiCall(this.searchValue).subscribe(data => {
          this.searchResults = data.Search;
          console.log(this.searchResults);
      });
  }

}
