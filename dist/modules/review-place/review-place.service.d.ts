import { CreateReviewPlaceDTO } from './dto/create-review-place.dto';
import { Model } from 'mongoose';
import { ReviewPlace } from './interfaces/review-place.interface';
import { Place } from '../place/interfaces/place.interface';
export declare class ReviewPlaceService {
    private readonly reviewModel;
    private readonly placeModel;
    constructor(reviewModel: Model<ReviewPlace>, placeModel: Model<Place>);
    createReview(body: CreateReviewPlaceDTO): Promise<ReviewPlace>;
    getReview(body: any): Promise<ReviewPlace[]>;
    getReviewBuser(body: any): Promise<ReviewPlace[]>;
    getAllReview(): Promise<ReviewPlace[]>;
}
