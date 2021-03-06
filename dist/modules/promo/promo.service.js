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
exports.PromoService = exports.CodeId = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
class CodeId {
}
exports.CodeId = CodeId;
let PromoService = class PromoService {
    constructor(promoModel) {
        this.promoModel = promoModel;
    }
    async createPromo(promo) {
        return await new this.promoModel(promo).save();
    }
    async getCode() {
        const code = await this.promoModel.find().exec();
        return code;
    }
    async getCodeById(id) {
        const code = await this.promoModel.findById(id).exec();
        return code;
    }
    async getSevralCode(req) {
        const value = await this.promoModel.find({
            '_id': { $in: req.code }
        });
        return value;
    }
};
PromoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Promo')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PromoService);
exports.PromoService = PromoService;
//# sourceMappingURL=promo.service.js.map