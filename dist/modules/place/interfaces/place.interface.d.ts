import { Document } from 'mongoose';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';
import { PlaceType } from 'src/modules/place-type/interfaces/place-type.interface';
import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image } from 'src/modules/types';
export interface Place extends Document {
    readonly title: string;
    readonly aboutUser: string;
    readonly location: {
        readonly address: string;
        readonly postalCode: string;
        readonly city: string;
        readonly country: string;
        readonly longitude: number;
        readonly latitude: number;
    };
    readonly surface: string;
    readonly placeType: PlaceType[];
    readonly price: number;
    readonly rentingDuration: string;
    readonly description: string;
    readonly features: Feature[];
    readonly images: Image[];
    readonly authorizeAnimals: boolean;
    readonly authorizeMusic: boolean;
    readonly authorizeSmoking: boolean;
    readonly authorizeFire: boolean;
    readonly authorizeFoodAndDrink: boolean;
    readonly rate: number;
    readonly reviews: Review[];
    readonly created_at: {
        readonly type: Date;
        readonly default: Date;
    };
}
