import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Booking } from 'src/modules/booking/interfaces/booking.interface';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';

import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Availability, Image, Location } from 'src/modules/types';

export class CreatePlaceDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  readonly location: Location;

  @IsNumber()
  @IsNotEmpty()
  readonly surface: number;

  readonly placeType: PlaceType;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  readonly features: Array<Feature> = [];

  readonly images: Array<Image> = [];

  @IsBoolean()
  readonly authorizeAnimals: boolean;

  @IsBoolean()
  readonly authorizeMusic: boolean;

  @IsBoolean()
  readonly authorizeSmoking: boolean;

  @IsBoolean()
  readonly authorizeFire: boolean;

  @IsBoolean()
  readonly authorizeFoodAndDrink: boolean;

  @IsString()
  readonly ownerId: string;

  readonly rate: number;

  readonly reviews: Array<Review> = [];

  readonly bookings: Array<Booking> = [];

  readonly isFavorite: boolean;

  readonly created_at: Date;

  availabilities: Array<Availability> = [];
}
