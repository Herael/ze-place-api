import { ReviewPlaceService } from './review-place.service';
export declare class ReviewPlaceController {
    private reviewPlaceService;
    constructor(reviewPlaceService: ReviewPlaceService);
    ceateReview(req: any, res: any, body: any): Promise<any>;
    getReview(req: any, res: any, body: any): Promise<any>;
    getAllReview(req: any, res: any): Promise<any>;
}
