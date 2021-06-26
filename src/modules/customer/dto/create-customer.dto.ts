import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Place } from 'src/modules/place/interfaces/place.interface';
import { Location } from 'src/modules/types';

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
  readonly favorites: Place[];

  @IsString()
  readonly customerId: string = null;

  readonly ownedPlaces: Place[] = [];

  readonly bookings: Place[] = [];

  readonly pushToken: string = null;

  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  readonly IDRecto: string;

  @IsNotEmpty()
  readonly IDVerso: string;

  @IsNotEmpty()
  location: Location;

  readonly created_at: Date;
}
