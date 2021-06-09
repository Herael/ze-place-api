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
    async findById(placeId) {
        const place = await this.placeModel.findById(placeId).exec();
        return place;
    }
    async getPlacesNearbyCoordinates(coords, distance) {
        let places = await this.placeModel.find().exec();
        places = places.filter((place) => index_1.isPlaceInRadius({
            longitude: place.location.longitude,
            latitude: place.location.latitude,
        }, coords, distance) === true);
        return places;
    }
    async bookPlace(userId, placeId, bookingDTO) {
        const user = await this.customerModel.findById(userId);
        const place = await this.findById(placeId);
        const booking = Object.assign({ userId: user._id, firstname: user.first_name, lastname: user.last_name, avatar: user.avatar }, bookingDTO);
        place.bookings.push(booking);
        place.save();
        user.bookings.push(place);
        user.save();
    }
    async getBookings(placeId) {
        const place = await this.findById(placeId);
        return place.bookings;
    }
    async acceptBooking(placeId, bookingId) {
        const place = await this.findById(placeId);
        const booking = place.bookings.find((booking) => booking._id.toString() === bookingId.toString());
        booking.isAccepted = true;
        place.save();
        return place.bookings;
    }
    async createPlace(createPlaceDTO) {
        const newPlace = await new this.placeModel(createPlaceDTO).save();
        const updatedCustomer = await this.customerModel.findById(createPlaceDTO.ownerId);
        updatedCustomer.ownedPlaces.push(newPlace);
        updatedCustomer.save();
        return newPlace;
    }
    async similarPlaces(placeID) {
        const place = await this.placeModel.findById(placeID);
        const priceDif = 0.2;
        const price = place.price;
        const distance = 20000;
        const coords = {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        };
        let places = await this.placeModel
            .find({
            _id: { $ne: place._id },
            placeType: { $elemMatch: { name: place.placeType[0].name } },
        })
            .exec();
        places = places.filter((place) => index_1.isPlaceInRadius({
            longitude: place.location.longitude,
            latitude: place.location.latitude,
        }, coords, distance) === true);
        places = places.filter((placeElement) => index_1.isInRangePrice(price, placeElement.price, priceDif) === true);
        return places;
    }
    async searchPlaces(placeTypeName, price, surface, features, location) {
        const distance = 20000;
        let places = [];
        if (placeTypeName && surface) {
            places = await this.placeModel
                .find({
                placeType: { $elemMatch: { name: placeTypeName } },
                surface: { $gte: surface },
            })
                .exec();
        }
        else if (placeTypeName) {
            places = await this.placeModel
                .find({
                placeType: { $elemMatch: { name: placeTypeName } },
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
            return [];
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