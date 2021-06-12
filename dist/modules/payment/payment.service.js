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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../customer/customer.service");
const stripe = require('stripe')('sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7');
let PaymentService = class PaymentService {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async createPaymentIntent(token, bookingPrice) {
        const user = await this.customerService.findByEmail(token.email);
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: user.customerId }, { apiVersion: '2020-08-27' });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: bookingPrice,
            currency: 'eur',
            customer: user.customerId,
        });
        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: user.customerId,
        };
    }
    async createPayout(token, bookingPrice) {
        const user = await this.customerService.findByEmail(token.email);
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: user.customerId }, { apiVersion: '2020-08-27' });
        const paymentIntent = await stripe.payout.create({
            amount: bookingPrice,
            currency: 'eur',
            customer: user.customerId,
        });
        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: user.customerId,
        };
    }
};
PaymentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map