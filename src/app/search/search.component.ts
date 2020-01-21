import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  getSearchValue(name) {
    this.searchValue = name;
    console.log(this.searchValue);
  }

}
