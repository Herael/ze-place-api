import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreatePromoDTO {

    @IsString()
    @IsNotEmpty()
  readonly name: string;

    @IsNotEmpty()
  readonly user_limit: Number;

    @IsNotEmpty()
  readonly end_date: Date;

}