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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookingService = class BookingService {
    constructor(bookingModel, customerModel, placeModel) {
        this.bookingModel = bookingModel;
        this.customerModel = customerModel;
        this.placeModel = placeModel;
    }
    async bookPlace(userId, bookingDTO) {
        const user = await this.customerModel.findById(userId);
        const place = await this.placeModel.findById(bookingDTO.placeId);
        const booking = Object.assign({ userId: user._id, firstname: user.first_name, lastname: user.last_name, avatar: user.avatar }, bookingDTO);
        const newPlace = await new this.bookingModel(booking).save();
        place.bookings.push(newPlace._id);
        place.save();
    }
    async getBookingsByPlaceAndUser(userId, placeId) {
        return await this.bookingModel
            .find({ userId, placeId, isPast: false })
            .exec();
    }
    async getBookingsByUser(userId) {
        return await this.bookingModel.find({ userId: userId }).exec();
    }
    async getBookingsByOwner(userId) {
        return await this.bookingModel.find({ ownerId: userId }).exec();
    }
    async getBookingsByPlace(placeId) {
        return await this.bookingModel.find({ placeId: placeId }).exec();
    }
    async getBookings() {
        return await this.bookingModel.find();
    }
    async acceptBooking(bookingId) {
        const booking = await this.bookingModel.findById(bookingId);
        booking.isAccepted = true;
        booking.isPast = true;
        booking.save();
        return booking;
    }
    async denyBooking(userId, bookingId) {
        const booking = await this.bookingModel.findById(bookingId);
        booking.isDenied = true;
        booking.isPast = true;
        booking.save();
        return booking;
    }
};
BookingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Booking')),
    __param(1, mongoose_1.InjectModel('Customer')),
    __param(2, mongoose_1.InjectModel('Place')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map