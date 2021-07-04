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
    constructor(placeModel, bookingModel, customerModel) {
        this.placeModel = placeModel;
        this.bookingModel = bookingModel;
        this.customerModel = customerModel;
    }
    async getAllPlaces(userId, limit) {
        const user = await this.customerModel.findById(userId);
        const places = await this.placeModel.find().limit(limit).exec();
        const formattedPlaces = places.map((place) => {
            place.isFavorite = Boolean(user.favorites.find((p) => p._id.toString() === place._id.toString()));
            return place;
        });
        return formattedPlaces;
    }
    async getAllPlacesShuffle(userId, limit) {
        const user = await this.customerModel.findById(userId);
        const places = await this.placeModel.find().limit(limit).exec();
        const formattedPlaces = places.map((place) => {
            place.isFavorite = Boolean(user.favorites.find((p) => p._id.toString() === place._id.toString()));
            return place;
        });
        return formattedPlaces.sort(() => 0.5 - Math.random());
    }
    async getAllPlacesAdmin() {
        const places = await this.placeModel.find().exec();
        return places;
    }
    async findById(userId, placeId) {
        const user = await this.customerModel.findById(userId);
        const place = await this.placeModel.findById(placeId).exec();
        place.isFavorite = Boolean(user.favorites.find((p) => p._id.toString() === place._id.toString()));
        return place;
    }
    async getPlacesNearbyCoordinates(coords, distance, limit) {
        let places = await this.placeModel.find().limit(limit).exec();
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
    async updatePlace(createPlaceDTO) {
        const place = await this.placeModel.findOneAndUpdate({
            _id: createPlaceDTO.placeId,
        }, {
            title: createPlaceDTO.title,
            location: createPlaceDTO.location,
            surface: createPlaceDTO.surface,
            placeType: createPlaceDTO.placeType,
            price: createPlaceDTO.price,
            description: createPlaceDTO.description,
            features: createPlaceDTO.features,
            images: createPlaceDTO.images,
            authorizeAnimals: createPlaceDTO.authorizeAnimals,
            authorizeMusic: createPlaceDTO.authorizeMusic,
            authorizeSmoking: createPlaceDTO.authorizeSmoking,
            authorizeFire: createPlaceDTO.authorizeFire,
            authorizeFoodAndDrink: createPlaceDTO.authorizeFoodAndDrink,
        });
        place.save();
        return place;
    }
    async similarPlaces(placeID, limit) {
        const place = await this.placeModel.findById(placeID);
        const priceDif = 0.4;
        const price = place.price;
        const distance = 20000;
        const coords = {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        };
        let places = await this.placeModel
            .find({
            _id: { $ne: place._id },
            placeType: place.placeType,
        })
            .limit(limit)
            .exec();
        places = places.filter((place) => index_1.isPlaceInRadius({
            longitude: place.location.longitude,
            latitude: place.location.latitude,
        }, coords, distance) === true);
        places = places.filter((placeElement) => index_1.isInRangePrice(price, placeElement.price, priceDif) === true);
        return places;
    }
    async searchPlaces(placeType, price, surface, features, location) {
        const distance = 20000;
        let places = [];
        if (placeType && surface) {
            places = await this.placeModel
                .find({
                placeType: placeType,
                surface: { $gte: surface },
            })
                .exec();
        }
        else if (placeType) {
            places = await this.placeModel
                .find({
                placeType: placeType,
            })
                .exec();
        }
        else if (surface) {
            places = await this.placeModel
                .find({
                surface: { $gte: surface },
            })
                .exec();
        }
        else {
            places = await this.placeModel.find();
        }
        if (location) {
            const coords = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            places = places.filter((place) => index_1.isPlaceInRadius({
                longitude: place.location.longitude,
                latitude: place.location.latitude,
            }, coords, distance) === true);
        }
        if (price) {
            places = places.filter((place) => index_1.isHigherPrice(price, place.price) === true);
        }
        if (features && features.length > 0) {
            places = places.filter((place) => index_1.isContainsFeatures(features, place.features) === true);
        }
        return places;
    }
    async deletePlace(placeId) {
        const place = await this.placeModel.findById(placeId);
        const bookings = await this.bookingModel.find({ placeId: placeId });
        const checkBooking = bookings.filter((booking) => index_1.isTooShortToDelete(booking.startDate) === true);
        if (checkBooking.length > 0) {
            return false;
        }
        bookings.forEach(async (e) => {
            await this.bookingModel.findByIdAndRemove(e._id);
        });
        await this.placeModel.findByIdAndRemove(placeId).exec();
        const user = await this.customerModel.findById(place.ownerId);
        user.ownedPlaces.filter((place) => index_1.filterOwnedPlace(place._id, placeId) === true);
        await user.save();
        return true;
    }
};
PlaceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Place')),
    __param(1, mongoose_2.InjectModel('Booking')),
    __param(2, mongoose_2.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map