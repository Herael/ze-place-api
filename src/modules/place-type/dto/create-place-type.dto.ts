import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaceTypeDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly created_at: Date;
}

export class CreatePlaceFeatureDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  readonly created_at: Date;
}