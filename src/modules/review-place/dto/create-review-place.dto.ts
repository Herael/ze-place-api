import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewPlaceDTO {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly writerId: string;

  @IsNotEmpty()
  @IsString()
  readonly placeId: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  readonly rate: number;

  readonly created_at: Date;
}
