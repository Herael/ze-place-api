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
exports.PlaceTypeController = void 0;
const common_1 = require("@nestjs/common");
const place_type_service_1 = require("./place-type.service");
let PlaceTypeController = class PlaceTypeController {
    constructor(typeService) {
        this.typeService = typeService;
    }
    async createType(res, data) {
        console.log(data);
        const places = await this.typeService.createType(data);
        return res.status(common_1.HttpStatus.OK).json(places);
    }
    async createFeatures(res, data) {
        console.log(data);
        const places = await this.typeService.createFeatures(data);
        return res.status(common_1.HttpStatus.OK).json(places);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceTypeController.prototype, "createType", null);
__decorate([
    common_1.Post('/features'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaceTypeController.prototype, "createFeatures", null);
PlaceTypeController = __decorate([
    common_1.Controller('place-type'),
    __metadata("design:paramtypes", [place_type_service_1.PlaceTypeService])
], PlaceTypeController);
exports.PlaceTypeController = PlaceTypeController;
//# sourceMappingURL=place-type.controller.js.map