"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewPLaceModule = void 0;
const common_1 = require("@nestjs/common");
const review_place_service_1 = require("./review-place.service");
const review_place_controller_1 = require("./review-place.controller");
const mongoose_1 = require("@nestjs/mongoose");
const review_place_schema_1 = require("./schemas/review-place.schema");
const place_schema_1 = require("../place/schemas/place.schema");
let ReviewPLaceModule = class ReviewPLaceModule {
};
ReviewPLaceModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'ReviewPlace', schema: review_place_schema_1.ReviewPlaceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Place', schema: place_schema_1.PlaceSchema }]),
        ],
        providers: [review_place_service_1.ReviewPlaceService],
        controllers: [review_place_controller_1.ReviewPlaceController],
        exports: [review_place_service_1.ReviewPlaceService],
    })
], ReviewPLaceModule);
exports.ReviewPLaceModule = ReviewPLaceModule;
//# sourceMappingURL=review-place.module.js.map