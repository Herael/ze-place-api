import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
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

  @IsString()
  @IsNotEmpty()
  readonly images: Array<Image>;

  @IsNumber()
  @IsPositive()
  @Max(5)
  readonly rate: number;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsDefined()
  readonly reviews: Array<Review>;
  readonly created_at: Date;
}
