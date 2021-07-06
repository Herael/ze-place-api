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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async init(res, req) {
        const paymentIntent = await this.paymentService.createPaymentIntent(req.body.customerId, req.body.paymentMethodId, req.body.bookingPrice);
        return res.status(common_1.HttpStatus.OK).json(paymentIntent);
    }
    async getCustomer(res, req) {
        const customer = await this.paymentService.getCustomer(req.params.customerId);
        return res.status(common_1.HttpStatus.OK).json(customer);
    }
    async getPaymentMethods(res, req) {
        const paymentMethods = await this.paymentService.getPaymentMethods(req.params.customerId);
        return res.status(common_1.HttpStatus.OK).json(paymentMethods);
    }
    async attachPaymentMethod(res, req) {
        const paymentMethod = await this.paymentService.attachPaymentMethod(req.body.customerId, req.body.paymentMethodId);
        return res.status(common_1.HttpStatus.OK).json(paymentMethod);
    }
    async detachPaymentMethod(res, req) {
        const paymentMethod = await this.paymentService.detachPaymentMethod(req.body.customerId, req.body.paymentMethodId);
        return res.status(common_1.HttpStatus.OK).json(paymentMethod);
    }
    async updatePaymentMethod(res, req) {
        const paymentMethod = await this.paymentService.updatePaymentMethod(req.body.customerId, req.body.paymentMethodId);
        return res.status(common_1.HttpStatus.OK).json(paymentMethod);
    }
    async createBankAccount(res, req) {
        const bankAccount = await this.paymentService.createBankAccount(req.body.accountId, {
            holderName: req.body.holderName,
            account_number: req.body.account_number,
        });
        return res.status(common_1.HttpStatus.OK).json(bankAccount);
    }
    async updateDefaultBankAccount(res, req) {
        const bankAccount = await this.paymentService.updateDefaultBankAccount(req.body.accountId, req.body.bankAccountId);
        return res.status(common_1.HttpStatus.OK).json(bankAccount);
    }
    async removeBankAccount(res, req) {
        const bankAccount = await this.paymentService.removeBankAccount(req.body.accountId, req.body.bankAccountId);
        return res.status(common_1.HttpStatus.OK).json(bankAccount);
    }
    async getBankAccount(res, req) {
        const bankAccount = await this.paymentService.getBankAccount(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(bankAccount);
    }
    async getBalance(res, req) {
        const balance = await this.paymentService.getBalance(req.body.accountId);
        return res.status(common_1.HttpStatus.OK).json(balance);
    }
    async initSetupIntent(res, req) {
        const setupIntent = await this.paymentService.initSetupIntent(req.body.customerId, req.body.paymentMethodId);
        return res.status(common_1.HttpStatus.OK).json(setupIntent);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/paymentIntent/create'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "init", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/customer/:customerId'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getCustomer", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/paymentMethods/:customerId'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentMethods", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/paymentMethods/add'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "attachPaymentMethod", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/paymentMethods/remove'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "detachPaymentMethod", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/paymentMethods/update'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePaymentMethod", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/bankAccount/new'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createBankAccount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/bankAccount/update'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updateDefaultBankAccount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/bankAccount/remove'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "removeBankAccount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/bankAccount/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getBankAccount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/balance'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getBalance", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/setupIntent/create'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initSetupIntent", null);
PaymentController = __decorate([
    common_1.Controller('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map