import { IMenu } from './menu';

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
  cuisines: string;
  rating: number;
  reviews: string;
  feature_image: string;
  thumbnail_image: string;
  menu: IMenu[];
}
