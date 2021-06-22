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
exports.ReviewPlaceController = void 0;
const common_1 = require("@nestjs/common");
const review_place_service_1 = require("./review-place.service");
let ReviewPlaceController = class ReviewPlaceController {
    constructor(reviewPlaceService) {
        this.reviewPlaceService = reviewPlaceService;
    }
    async ceateReview(req, res, body) {
        const review = await this.reviewPlaceService.createReview(body);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Booking has been created successfully',
            data: review
        });
    }
    async getReview(req, res, body) {
        console.log(body);
        const review = await this.reviewPlaceService.getReview(body);
        return res.status(common_1.HttpStatus.OK).json({
            data: review
        });
    }
    async getReviewBuser(req, res, body) {
        console.log(body);
        const review = await this.reviewPlaceService.getReviewBuser(body);
        return res.status(common_1.HttpStatus.OK).json({
            data: review
        });
    }
    async getAllReview(req, res) {
        const review = await this.reviewPlaceService.getAllReview();
        return res.status(common_1.HttpStatus.OK).json({
            data: review
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewPlaceController.prototype, "ceateReview", null);
__decorate([
    common_1.Post('/get'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewPlaceController.prototype, "getReview", null);
__decorate([
    common_1.Get('/getByUser'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewPlaceController.prototype, "getReviewBuser", null);
__decorate([
    common_1.Get('/getAll'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewPlaceController.prototype, "getAllReview", null);
ReviewPlaceController = __decorate([
    common_1.Controller('review-place'),
    __metadata("design:paramtypes", [review_place_service_1.ReviewPlaceService])
], ReviewPlaceController);
exports.ReviewPlaceController = ReviewPlaceController;
//# sourceMappingURL=review-place.controller.js.map