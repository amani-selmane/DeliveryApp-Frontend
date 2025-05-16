import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  // @Input() public restaurantSearch;
  public restaurantSearch = '';

  @Output() searchQueryEvent = new EventEmitter();

  constructor() { }

  searchQuery = (query) => {
    this.searchQueryEvent.emit(query);
  }

  clearSearch = () => {
    this.restaurantSearch = '';
    this.searchQueryEvent.emit(this.restaurantSearch);
  }

  ngOnInit(): void {
  }

}
