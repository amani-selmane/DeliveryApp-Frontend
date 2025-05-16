import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RestaurantService } from './restaurant.service';
import { IRestaurant } from '../models/restaurant';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService]
    });

    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch restaurants from backend (Spring Boot)', () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        id: 1,
        name: 'Pizza Paradise',
        address: '123 Main St',
        cuisines: 'Italian',
        rating: 4.5,
        reviews: '120',
        feature_image: 'pizza.jpg',
        thumbnail_image: 'pizza_thumb.jpg',
        menu: []
      }
    ];

    service.getRestaurantsList().subscribe(restaurants => {
      expect(restaurants.length).toBe(1);
      expect(restaurants).toEqual(dummyRestaurants);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/restaurants'); // URL of your Spring Boot endpoint
    expect(req.request.method).toBe('GET');
    req.flush(dummyRestaurants);
  });
});
