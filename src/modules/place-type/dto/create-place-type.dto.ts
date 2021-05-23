import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaceTypeDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly created_at: Date;
}
