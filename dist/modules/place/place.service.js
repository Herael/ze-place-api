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
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const index_1 = require("../../utils/index");
let PlaceService = class PlaceService {
    constructor(placeModel, customerModel) {
        this.placeModel = placeModel;
        this.customerModel = customerModel;
    }
    async getAllPlaces() {
        const places = await this.placeModel.find().exec();
        return places;
    }
    async getPlacesNearbyCoordinates(coords, distance) {
        let places = await this.placeModel.find().exec();
        places = places.filter((place) => index_1.isPlaceInRadius({
            longitude: place.location.longitude,
            latitude: place.location.latitude,
        }, coords, distance) === true);
        return places;
    }
    async createPlace(createPlaceDTO) {
        const newPlace = await new this.placeModel(createPlaceDTO).save();
        const updatedCustomer = await this.customerModel.findById(createPlaceDTO.ownerId);
        updatedCustomer.ownedPlaces.push(newPlace);
        updatedCustomer.save();
        return newPlace;
    }
    async similarPlaces(place) {
        console.log(place._id);
        const priceDif = 0.1;
        let priceType = 1;
        const distance = 5000;
        if (place.rentingDuration == 'week') {
            priceType = 7;
        }
        else if (place.rentingDuration == 'month') {
            priceType = 30;
        }
        console.log('Original price : ' + place.price);
        console.log('Place type : ' + place.rentingDuration);
        console.log('divider value : ' + priceType);
        console.log('price : ' + place.price / priceType);
        console.log('10% more : ' +
            (place.price / priceType +
                (place.price / priceType) * priceDif).toString());
        console.log('10% less : ' +
            (place.price / priceType -
                (place.price / priceType) * priceDif).toString());
        const coords = {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        };
        const places = await this.placeModel
            .find({
            _id: { $ne: place._id },
            placeType: { $elemMatch: { name: place.placeType[0].name } },
            $or: [
                {
                    price: {
                        $lte: place.price / priceType + (place.price / priceType) * priceDif,
                    },
                },
                {
                    price: {
                        $gte: place.price / priceType - (place.price / priceType) * priceDif,
                    },
                },
            ],
        })
            .exec();
        const nearbyPlaces = places.filter((place) => index_1.isPlaceInRadius({
            longitude: place.location.longitude,
            latitude: place.location.latitude,
        }, coords, distance) === true);
        return nearbyPlaces;
    }
};
PlaceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Place')),
    __param(1, mongoose_2.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map