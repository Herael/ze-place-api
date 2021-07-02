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
exports.ChargesController = void 0;
const common_1 = require("@nestjs/common");
const charges_service_1 = require("./charges.service");
let ChargesController = class ChargesController {
    constructor(chargesService) {
        this.chargesService = chargesService;
    }
    async createTVA(req, res, body) {
        const booking = await this.chargesService.createTVA(body);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Booking has been created successfully',
            booking,
        });
    }
    async createService(req, res, body) {
        const booking = await this.chargesService.createService(body);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Booking has been created successfully',
            booking,
        });
    }
};
__decorate([
    common_1.Post('/createTVA'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChargesController.prototype, "createTVA", null);
__decorate([
    common_1.Post('/createService'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChargesController.prototype, "createService", null);
ChargesController = __decorate([
    common_1.Controller('charges'),
    __metadata("design:paramtypes", [charges_service_1.ChargesService])
], ChargesController);
exports.ChargesController = ChargesController;
//# sourceMappingURL=charges.controller.js.map