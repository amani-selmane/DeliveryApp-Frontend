import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';
import { ISortOption } from '../../models/sort-option';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  public restaurants = [];
  public restaurantsConstant = [];
  public userName = '';

  sortOptions: ISortOption[] = [
    {value: 'name', viewValue: 'Name'},
    {value: 'rating', viewValue: 'Rating'},
    {value: 'reviews', viewValue: 'Review'}
  ];

  selectedValue = this.sortOptions[0].value; // default sorting

  constructor(private _restaurantService: RestaurantService, private router: Router) { }

  inputName = async() => {
    await Swal.fire({
      title: 'Your name?',
      text: "We keep your name confidential!",
      input: 'text',
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!'
        }
        else {
          this._restaurantService.setUserName(value);
          this.userName = this._restaurantService.userName;
        }
      }
    });
  }

  searchQuery = (query) => {
    this.restaurants = this.restaurantsConstant.filter((restaurant) =>  JSON.stringify(restaurant).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  sortRestaurants = (selectedValue) => {

    if (selectedValue === 'rating'){
      this.restaurants = this.restaurants.sort((a,b) => {
        return b.rating - a.rating
      });
    }

    else if (selectedValue === 'reviews'){
      this.restaurants = this.restaurants.sort((a,b) => {
        return b.reviews - a.reviews
      });
    }

    else if (selectedValue === 'name'){
       function compareName (a, b)  {
        // case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
      }
      this.restaurants = this.restaurants.sort((a,b) => {
        return compareName(a.name, b.name)
      });
    }
  }

  goToRestaurant = (restaurant) => {
    this.router.navigate(['/restaurants', restaurant.id])
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.status,
      text: error.message,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  ngOnInit(): void {
    this._restaurantService.getRestaurantsList().subscribe(
      (data) => {
        this.restaurantsConstant = this.restaurants = data;
        this.sortRestaurants(this.selectedValue);
        this.userName = this._restaurantService.userName;
        if(!this._restaurantService.userName) {
          this.inputName();
        }
      },
      (error) => {
        this.showError(error);
      }
    );
  }

}
