import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePromoDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly user_limit: number;

  @IsNotEmpty()
  readonly end_date: Date;
}
