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
exports.PromoController = void 0;
const promo_service_1 = require("./promo.service");
const common_1 = require("@nestjs/common");
let PromoController = class PromoController {
    constructor(promoService) {
        this.promoService = promoService;
    }
    async create(req) {
        console.log(req.body);
        return this.promoService.createPromo(req.body);
    }
    async getCode(res) {
        const code = await this.promoService.getCode();
        return res.status(common_1.HttpStatus.OK).json(code);
    }
    async getSevralCode(res, req) {
        console.log(req.body);
        const code = await this.promoService.getSevralCode(req.body);
        return res.status(common_1.HttpStatus.OK).json(code);
    }
};
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "create", null);
__decorate([
    common_1.Get('/getCode'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "getCode", null);
__decorate([
    common_1.Post('/getSevralCode'),
    __param(0, common_1.Res()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "getSevralCode", null);
PromoController = __decorate([
    common_1.Controller('promo'),
    __metadata("design:paramtypes", [promo_service_1.PromoService])
], PromoController);
exports.PromoController = PromoController;
//# sourceMappingURL=promo.controller.js.map