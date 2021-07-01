import { Booking } from 'src/modules/booking/interfaces/booking.interface';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { ReviewPlace } from 'src/modules/review-place/interfaces/review-place.interface';
import { Image, Location, Availability } from 'src/modules/types';
export declare class CreatePlaceDTO {
    readonly placeId: string;
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
    readonly reviews: Array<ReviewPlace>;
    readonly bookings: Array<Booking>;
    readonly isFavorite: boolean;
    readonly created_at: Date;
    availabilities: Array<Availability>;
}
