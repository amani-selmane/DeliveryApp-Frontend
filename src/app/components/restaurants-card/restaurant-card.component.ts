import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input() public restaurantName;
  @Input() public restaurantThumbnail;
  @Input() public restaurantImage;
  @Input() public cuisines;
  @Input() public rating;
  @Input() public review;

  public math = Math;

  constructor() { }

  ngOnInit(): void {
  }

}
