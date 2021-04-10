import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image } from 'src/modules/types';

export class CreatePlaceDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ArrayNotEmpty()
  readonly images: Array<Image>;

  @IsNumber()
  @Min(0)
  @Max(5)
  readonly rate: number;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsDefined()
  readonly reviews: Array<Review>;

  readonly created_at: Date;
}
