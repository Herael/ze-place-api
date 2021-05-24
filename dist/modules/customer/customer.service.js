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
const promo_interface_1 = require("../../promo/interfaces/promo.interface");
let CustomerService = class CustomerService {
    constructor(customerModel, promoModel) {
        this.customerModel = customerModel;
        this.promoModel = promoModel;
    }
    async getAllCustomer() {
        const customers = await this.customerModel.find().exec();
        return customers;
    }
    async findById(customerID) {
        const customer = await this.customerModel.findById(customerID).exec();
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
    async addPromoCode(promoCodeName, customerID) {
        console.log(promoCodeName.name);
        console.log(customerID);
        const code = await this.promoModel.findOne({ name: promoCodeName.name }).exec();
        const custo = await this.customerModel.findById(customerID).exec();
        console.log(code._id);
        if (code.user_limit > 0) {
            if (code.end_date > new Date()) {
                if (!custo.promoCode.includes(promoCodeName.name) && !custo.historyCode.includes(promoCodeName.name)) {
                    const customer = await this.customerModel.findOneAndUpdate({ _id: customerID }, { $push: { promoCode: code.name } }).exec();
                    const promo = await this.promoModel.findOneAndUpdate({ _id: code._id }, { user_limit: code.user_limit - 1 });
                    console.log(customer);
                    return customer;
                }
                else {
                    return "vous avez deja ce code promo actif";
                }
            }
            else {
                return "La date d'activité du code est depassé";
            }
        }
        else {
            return "Le code a deja rassemblé tout ses utilisateur";
        }
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Customer')),
    __param(1, mongoose_2.InjectModel('Promo')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map