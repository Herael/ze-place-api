import { Injectable } from '@nestjs/common';
import { CreateReviewPlaceDTO } from './dto/create-review-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewPlace } from './interfaces/review-place.interface';
import { Place } from '../place/interfaces/place.interface';

@Injectable()
export class ReviewPlaceService {
    constructor(
    @InjectModel('ReviewPlace') private readonly reviewModel: Model<ReviewPlace>,
    @InjectModel('Place') private readonly placeModel: Model<Place>,
    ) {}

    async createReview(body:CreateReviewPlaceDTO) {
        const review = await new this.reviewModel(body).save();
        const place = await this.placeModel.findById(body.placeId);
        const reviews = await this.reviewModel.find({ placeId: body.placeId })
        place.reviews.push(review._id);
        var rate =0;
        reviews.forEach(e => {
            rate += e.rate
        });
        
        place.reviews.length
        place.rate = rate/place.reviews.length
        place.save();
        return review
    }

    async getReview(body) {
        const reviews = await  this.reviewModel.find({placeId: body.placeId})
       return reviews
        
    }
    async getAllReview() {
        const reviews = await  this.reviewModel.find()
       return reviews
        
    }

}
