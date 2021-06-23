import { Document } from 'mongoose';
import { Booking } from 'src/modules/booking/interfaces/booking.interface';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { ReviewPlace } from 'src/modules/review-place/interfaces/review-place.interface';
import { Image, Availability } from 'src/modules/types';

export interface Place extends Document {
  readonly title: string;
  readonly location: {
    readonly address: string;
    readonly postalCode: string;
    readonly city: string;
    readonly country: string;
    readonly longitude: number;
    readonly latitude: number;
  };
  readonly surface: number;
  readonly placeType: PlaceType[];
  readonly price: number;
  readonly description: string;
  readonly features: Feature[];
  readonly images: Image[];
  readonly authorizeAnimals: boolean;
  readonly authorizeMusic: boolean;
  readonly authorizeSmoking: boolean;
  readonly authorizeFire: boolean;
  readonly authorizeFoodAndDrink: boolean;
  readonly ownerId: string;
  rate: number;
  readonly reviews: ReviewPlace[];
  readonly bookings: Booking[];
  availabilities: Availability[];
  isFavorite: boolean;
  readonly created_at: {
    readonly type: Date;
    readonly default: Date;
  };
}
