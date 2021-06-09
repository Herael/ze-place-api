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
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_place_dto_1 = require("./dto/create-place.dto");
const place_service_1 = require("./place.service");
let PlaceController = class PlaceController {
    constructor(placeService) {
        this.placeService = placeService;
    }
    async getAllPlaces(res) {
        const places = await this.placeService.getAllPlaces();
        return res.status(common_1.HttpStatus.OK).json(places);
    }
    async getPlacesNearbyCoordinates(res, data) {
        const places = await this.placeService.getPlacesNearbyCoordinates(data.coords, data.distance);
        return res.status(common_1.HttpStatus.OK).json(places);
    }
    async createPlace(res, createPlaceDTO) {
        const place = await this.placeService.createPlace(createPlaceDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Place has been created successfully',
            place,
        });
    }
    async booking(req, res, body) {
        await this.placeService.bookPlace(req.user.id, body.placeId, {
            feature: body.booking.features[0],
            startDate: body.booking.startDate,
            endDate: body.booking.endDate,
            duration: body.booking.duration,
            price: body.booking.price,
            description: body.booking.description,
            isAccepted: false,
        });
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Place has been booked successfully',
        });
    }
    async bookings(res, req) {
        const bookings = await this.placeService.getBookings(req.params.placeId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Place has been booked successfully',
            bookings,
        });
    }
    async acceptBooking(res, body) {
        const bookings = await this.placeService.acceptBooking(body.placeId, body.bookingId);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Booking has been accepted',
            bookings: bookings,
        });
    }
    async similarPlaces(res, body) {
        const places = await this.placeService.similarPlaces(body.placeID);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Similar places has been get successfully',
            places,
        });
    }
    async searchPlaces(res, body) {
        const places = await this.placeService.searchPlaces(body.placeTypeName, body.price, body.surface, body.features, body.location);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Search places has been get successfully',
            places,
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "getAllPlaces", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "getPlacesNearbyCoordinates", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_place_dto_1.CreatePlaceDTO]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "createPlace", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/booking'),
    __param(0, common_1.Request()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "booking", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:placeId/bookings'),
    __param(0, common_1.Res()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "bookings", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/booking/accept'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "acceptBooking", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/similarPlaces'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "similarPlaces", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/searchPlaces'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "searchPlaces", null);
PlaceController = __decorate([
    common_1.Controller('places'),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], PlaceController);
exports.PlaceController = PlaceController;
//# sourceMappingURL=place.controller.js.map