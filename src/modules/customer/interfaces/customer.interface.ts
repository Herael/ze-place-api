import { Document } from 'mongoose';
import { Place } from 'src/modules/place/interfaces/place.interface';
import { Location } from 'src/modules/types';

export interface Customer extends Document {
  readonly avatar: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly birthdate: Date;
  readonly phoneNumber: string;
  readonly email: string;
  password: string;
  readonly description: string;
  readonly created_at: Date;
  readonly promoCode: [string];
  readonly historyCode: [string];
  readonly gender: string;
  readonly IDRecto: string;
  readonly IDVerso: string;
  readonly location: Location;
  favorites: Place[];
  customerId: string;
  ownedPlaces: Place[];
  pushToken: string;
  stripeAccount: string;
}
