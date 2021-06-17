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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async booking(req, res, body) {
        const booking = await this.bookingService.bookPlace(req.user.id, {
            ownerId: body.booking.ownerId,
            placeId: body.booking.placeId,
            feature: body.booking.features[0],
            startDate: body.booking.startDate,
            endDate: body.booking.endDate,
            duration: body.booking.duration,
            price: body.booking.price,
            description: body.booking.description,
        });
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Booking has been created successfully',
            booking,
        });
    }
    async getBookingsByPlaceAndUser(req, res) {
        const bookings = await this.bookingService.getBookingsByPlaceAndUser(req.user.id, req.params.placeId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by place and user',
            bookings,
        });
    }
    async getBookingsByUser(req, res) {
        const bookings = await this.bookingService.getBookingsByUser(req.user.id);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by user',
            bookings,
        });
    }
    async getBookingsByOwner(req, res) {
        const bookings = await this.bookingService.getBookingsByOwner(req.user.id);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by owner',
            bookings,
        });
    }
    async getBookingsByPlace(req, res) {
        const bookings = await this.bookingService.getBookingsByPlace(req.params.placeId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by place',
            bookings,
        });
    }
    async acceptBooking(req, res) {
        const booking = await this.bookingService.acceptBooking(req.params.bookingId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by place',
            booking,
        });
    }
    async denyBooking(req, res) {
        const booking = await this.bookingService.denyBooking(req.user.id, req.params.bookingId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Get bookings by place',
            booking,
        });
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/create'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "booking", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:placeId/user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingsByPlaceAndUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingsByUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/owner'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingsByOwner", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:placeId'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingsByPlace", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:bookingId/accept'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "acceptBooking", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:bookingId/deny'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "denyBooking", null);
BookingController = __decorate([
    common_1.Controller('bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map