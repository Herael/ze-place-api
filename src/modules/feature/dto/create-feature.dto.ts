import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly created_at: Date;
}
