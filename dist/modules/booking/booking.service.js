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
const schedule_1 = require("@nestjs/schedule");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils");
const stripe = require('stripe')('sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7');
let BookingService = class BookingService {
    constructor(bookingModel, customerModel, placeModel) {
        this.bookingModel = bookingModel;
        this.customerModel = customerModel;
        this.placeModel = placeModel;
    }
    async bookPlace(userId, bookingDTO) {
        const user = await this.customerModel.findById(userId);
        const place = await this.placeModel.findById(bookingDTO.placeId);
        const owner = await this.customerModel.findById(place.ownerId);
        const booking = Object.assign({ userId: user._id, firstname: user.first_name, lastname: user.last_name, avatar: user.avatar, placeCover: place.images[0].url, placeTitle: place.title }, bookingDTO);
        const newPlace = await new this.bookingModel(booking).save();
        place.bookings.push(newPlace._id);
        const dates = utils_1.dateToAvailabilities(user._id, new Date(booking.startDate), new Date(booking.endDate));
        place.availabilities = [...place.availabilities, ...dates];
        place.save();
        utils_1.sendPushNotifications({
            pushId: owner.pushToken,
            title: `${place.title}`,
            subtitle: 'Your place has been booked',
            description: `${user.first_name} ${user.last_name} has booked your place, send him a message now !`,
        });
    }
    async getBookingsOfTheDay() {
        const currentDate = new Date();
        const month = `${currentDate.getMonth() < 10 ? '0' : ''}${currentDate.getMonth() + 1}`;
        const day = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}`;
        const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
        return await this.bookingModel
            .find({ startDate: formatDate, isAccepted: true, isPaid: false })
            .sort({ created_at: -1 })
            .exec();
    }
    async getEndedBookings() {
        const currentDate = new Date();
        const month = `${currentDate.getMonth() < 10 ? '0' : ''}${currentDate.getMonth() + 1}`;
        const day = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}`;
        const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
        return await this.bookingModel
            .find({ endDate: formatDate, isAccepted: true, isPaid: true })
            .sort({ created_at: -1 })
            .exec();
    }
    async getBookingsByPlaceAndUser(userId, placeId) {
        return await this.bookingModel
            .find({ userId, placeId, isPast: false })
            .sort({ created_at: -1 })
            .exec();
    }
    async getBookingsByUser(userId) {
        return await this.bookingModel
            .find({ userId: userId })
            .sort({ created_at: -1 })
            .exec();
    }
    async getBookingsByOwner(userId) {
        return await this.bookingModel
            .find({ ownerId: userId })
            .sort({ created_at: -1 })
            .exec();
    }
    async getBookingsByPlace(placeId) {
        return await this.bookingModel
            .find({ placeId: placeId })
            .sort({ created_at: -1 })
            .exec();
    }
    async getBookings() {
        return await this.bookingModel.find().sort({ created_at: -1 });
    }
    async acceptBooking(bookingId) {
        const booking = await this.bookingModel.findById(bookingId);
        const owner = await this.customerModel.findById(booking.ownerId);
        const user = await this.customerModel.findById(booking.userId);
        const place = await this.placeModel.findById(booking.placeId);
        const placeBooking = place.bookings.find((booking) => booking._id.toString() === bookingId.toString());
        placeBooking.isAccepted = true;
        place.save();
        utils_1.sendPushNotifications({
            pushId: user.pushToken,
            title: `${place.title}`,
            subtitle: `${owner.first_name} has accepted your reservation`,
            description: 'Find it in the reservation tab, you can continue to discuss with the owner',
        });
        booking.isAccepted = true;
        booking.save();
        return booking;
    }
    async denyBooking(userId, bookingId) {
        const booking = await this.bookingModel.findById(bookingId);
        const user = await this.customerModel.findById(booking.userId);
        const owner = await this.customerModel.findById(booking.ownerId);
        const place = await this.placeModel.findById(booking.placeId);
        place.availabilities = place.availabilities.filter((availabilities) => availabilities.userId !== booking.userId);
        const placeBooking = place.bookings.find((booking) => booking._id.toString() === bookingId.toString());
        placeBooking.isDenied = true;
        placeBooking.isAccepted = false;
        place.save();
        await stripe.refunds.create({
            payment_intent: booking.paymentId,
        });
        if (userId === booking.userId) {
            utils_1.sendPushNotifications({
                pushId: owner.pushToken,
                title: `${place.title}`,
                subtitle: `${user.first_name} canceled his reservation`,
                description: `A refund has been made, send him a message to find out why...`,
            });
        }
        else {
            utils_1.sendPushNotifications({
                pushId: user.pushToken,
                title: `${place.title}`,
                subtitle: `${owner.first_name} canceled your reservation`,
                description: 'Your reservation has been canceled, you will be refunded shortly.',
            });
        }
        booking.isAccepted = false;
        booking.isDenied = true;
        booking.isPast = true;
        booking.save();
        return booking;
    }
    async sendPaymentToClient() {
        const tva = 1.2;
        const fees = 1.2;
        const bookings = await this.getBookingsOfTheDay();
        if (bookings.length > 0) {
            bookings.forEach(async (booking) => {
                const owner = await this.customerModel.findById(booking.ownerId);
                const bookingModel = await this.bookingModel.findById(booking._id);
                const place = await this.placeModel.findById(booking.placeId);
                if (owner != null && owner.stripeAccount) {
                    bookingModel.isPaid = true;
                    bookingModel.save();
                    const priceHT = (booking.price * booking.duration * 100) / tva;
                    const priceOwner = priceHT / fees;
                    stripe.transfers.create({
                        amount: priceOwner,
                        currency: 'eur',
                        destination: owner.stripeAccount,
                    });
                    utils_1.sendPushNotifications({
                        pushId: owner.pushToken,
                        title: `${place.title}`,
                        subtitle: `New bank transfer`,
                        description: `The transfer of ${booking.price}€ from ${booking.firstname} has been made, find it directly in your account within 2 days.`,
                    });
                }
            });
        }
    }
    async closeBookings() {
        const bookings = await this.getEndedBookings();
        if (bookings.length > 0) {
            bookings.forEach(async (booking) => {
                const bookingModel = await this.bookingModel.findById(booking._id);
                const owner = await this.customerModel.findById(booking.ownerId);
                const place = await this.placeModel.findById(booking.placeId);
                utils_1.sendPushNotifications({
                    pushId: owner.pushToken,
                    title: `${place.title}`,
                    subtitle: `Reservation completed`,
                    description: `${booking.firstname}'s booking has ended !`,
                });
                bookingModel.isPast = true;
                bookingModel.save();
            });
        }
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "sendPaymentToClient", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingService.prototype, "closeBookings", null);
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