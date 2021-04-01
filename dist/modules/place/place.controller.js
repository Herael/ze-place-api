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
    async addPlace(res, createPlaceDTO) {
        const place = await this.placeService.addPlace(createPlaceDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Place has been created successfully',
            place,
        });
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "getAllPlaces", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_place_dto_1.CreatePlaceDTO]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "addPlace", null);
PlaceController = __decorate([
    common_1.Controller('places'),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], PlaceController);
exports.PlaceController = PlaceController;
//# sourceMappingURL=place.controller.js.map