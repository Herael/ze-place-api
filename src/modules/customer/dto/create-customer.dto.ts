import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Place } from 'src/modules/place/interfaces/place.interface';

export class CreateCustomerDTO {
  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  readonly birthdate: Date;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly created_at: Date;

  readonly favorites: Place[];
}
