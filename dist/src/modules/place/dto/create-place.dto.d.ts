import { Review } from 'src/modules/review/interfaces/review.interface';
import { Image } from 'types';
export declare class CreatePlaceDTO {
    readonly title: string;
    readonly location: string;
    readonly description: string;
    readonly images: Array<Image>;
    readonly rate: number;
    readonly price: number;
    readonly reviews: Array<Review>;
    readonly created_at: Date;
}
