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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt_1 = require("bcrypt");
let CustomerService = class CustomerService {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async getAllCustomer() {
        const customers = await this.customerModel.find().exec();
        return customers;
    }
    async findById(customerID) {
        const customer = await this.customerModel.findById(customerID).populate({
            path: 'favorites',
            model: 'Place',
        });
        return customer;
    }
    async findByEmail(email) {
        const customer = await this.customerModel.findOne({ email: email }).exec();
        return customer;
    }
    async addCustomer(customer) {
        const passwordHash = await bcrypt_1.hash(customer.password, 10);
        customer.password = passwordHash;
        return await new this.customerModel(customer).save();
    }
    async updateCustomer(customerID, createCustomerDTO) {
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }
    async deleteCustomer(customerID) {
        const deletedCustomer = await this.customerModel.findByIdAndRemove(customerID);
        return deletedCustomer;
    }
    async addFavorite(customerID, place) {
        const updatedCustomer = await this.customerModel.findById(customerID);
        updatedCustomer.favorites.push(place);
        console.log('User.favorite after added treatment : ' + updatedCustomer.favorites);
        updatedCustomer.save();
        return updatedCustomer;
    }
    async deleteFavorite(customerID, place) {
        const updatedCustomer = await this.customerModel.findById(customerID);
        const index = updatedCustomer.favorites.indexOf(place._id);
        if (index > -1) {
            updatedCustomer.favorites.splice(index, 1);
        }
        console.log('User.favorite after deleted treatment : ' + updatedCustomer.favorites);
        updatedCustomer.save();
        return updatedCustomer;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map