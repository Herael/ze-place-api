import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image, Location } from 'src/modules/types';
export declare class CreatePlaceDTO {
    readonly title: string;
    readonly aboutUser: string;
    readonly location: Location;
    readonly surface: string;
    readonly placeType: PlaceType;
    readonly price: number;
    readonly rentingDuration: string;
    readonly description: string;
    readonly features: Array<Feature>;
    readonly images: Array<Image>;
    readonly authorizeAnimals: boolean;
    readonly authorizeMusic: boolean;
    readonly authorizeSmoking: boolean;
    readonly authorizeFire: boolean;
    readonly authorizeFoodAndDrink: boolean;
    readonly rate: number;
    readonly reviews: Array<Review>;
    readonly created_at: Date;
}
