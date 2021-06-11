import { Booking } from 'src/modules/booking/interfaces/booking.interface';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image, Location } from 'src/modules/types';
export declare class CreatePlaceDTO {
    readonly title: string;
    readonly location: Location;
    readonly surface: number;
    readonly placeType: PlaceType;
    readonly price: number;
    readonly description: string;
    readonly features: Array<Feature>;
    readonly images: Array<Image>;
    readonly authorizeAnimals: boolean;
    readonly authorizeMusic: boolean;
    readonly authorizeSmoking: boolean;
    readonly authorizeFire: boolean;
    readonly authorizeFoodAndDrink: boolean;
    readonly ownerId: string;
    readonly rate: number;
    readonly reviews: Array<Review>;
    readonly bookings: Array<Booking>;
    readonly isFavorite: boolean;
    readonly created_at: Date;
}
