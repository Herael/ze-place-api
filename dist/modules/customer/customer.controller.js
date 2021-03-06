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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getAllCustomer(res) {
        const customers = await this.customerService.getAllCustomer();
        return res.status(common_1.HttpStatus.OK).json(customers);
    }
    async getCustomer(res, customerID) {
        const customer = await this.customerService.findById(customerID);
        if (!customer)
            throw new common_1.NotFoundException('Customer does not exist!');
        return res.status(common_1.HttpStatus.OK).json(customer);
    }
    async getCustomerByEmail(res, email) {
        const customer = await this.customerService.findByEmail(email);
        return res.status(common_1.HttpStatus.OK).json(customer);
    }
    async updateCustomer(res, customerID, createCustomerDTO) {
        const customer = await this.customerService.updateCustomer(customerID, createCustomerDTO);
        if (!customer)
            throw new common_1.NotFoundException('Customer does not exist!');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer,
        });
    }
    async addFavorite(req, res, place) {
        await this.customerService.addFavorite(req.user.id, place);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Favorite has been successfully added',
        });
    }
    async deleteFavorite(req, res, placeID) {
        await this.customerService.deleteFavorite(req.user.id, placeID);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Favorite has been successfully deleted',
        });
    }
    async deleteCustomer(res, customerID) {
        const customer = await this.customerService.deleteCustomer(customerID);
        if (!customer)
            throw new common_1.NotFoundException('Customer does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer,
        });
    }
    async addPromoCode(res, req, customerID) {
        const result = await this.customerService.addPromoCode(req.body, customerID);
        return res.status(common_1.HttpStatus.OK).json({
            data: result,
        });
    }
    async setToHistory(res, req) {
        const code = await this.customerService.setToHistory(req.body);
        return res.status(common_1.HttpStatus.OK).json(code);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAllCustomer", null);
__decorate([
    common_1.Get('/:customerID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomer", null);
__decorate([
    common_1.Get('/email/:email'),
    __param(0, common_1.Res()), __param(1, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerByEmail", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('customerID')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_customer_dto_1.CreateCustomerDTO]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/favorite/create'),
    __param(0, common_1.Request()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFavorite", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/favorite/delete/:placeID'),
    __param(0, common_1.Request()), __param(1, common_1.Res()), __param(2, common_1.Param('placeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteFavorite", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/addPromoCode'),
    __param(0, common_1.Res()),
    __param(1, common_1.Request()),
    __param(2, common_1.Query('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addPromoCode", null);
__decorate([
    common_1.Post('/setToHistory'),
    __param(0, common_1.Res()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "setToHistory", null);
CustomerController = __decorate([
    common_1.Controller('customers'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map