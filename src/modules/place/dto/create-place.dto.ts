import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';

import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image, Location } from 'src/modules/types';

export class CreatePlaceDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly aboutUser: string;

  readonly location: Location;

  @IsString()
  @IsNotEmpty()
  readonly surface: string;

  readonly placeType: PlaceType;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly rentingDuration: string;

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

  readonly rate: number;

  @IsDefined()
  readonly reviews: Array<Review> = [];

  readonly created_at: Date;
}
