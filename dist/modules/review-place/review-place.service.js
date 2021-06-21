"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewPlaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReviewPlaceService = class ReviewPlaceService {
    constructor(reviewModel, placeModel) {
        this.reviewModel = reviewModel;
        this.placeModel = placeModel;
    }
    async createReview(body) {
        const review = await new this.reviewModel(body).save();
        const place = await this.placeModel.findById(body.placeId);
        const reviews = await this.reviewModel.find({ placeId: body.placeId });
        place.reviews.push(review._id);
        var rate = 0;
        reviews.forEach(e => {
            rate += e.rate;
        });
        place.reviews.length;
        place.rate = rate / place.reviews.length;
        place.save();
        return review;
    }
    async getReview(body) {
        const reviews = await this.reviewModel.find({ placeId: body.placeId });
        return reviews;
    }
    async getAllReview() {
        const reviews = await this.reviewModel.find();
        return reviews;
    }
};
ReviewPlaceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('ReviewPlace')),
    __param(1, mongoose_1.InjectModel('Place')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ReviewPlaceService);
exports.ReviewPlaceService = ReviewPlaceService;
//# sourceMappingURL=review-place.service.js.map