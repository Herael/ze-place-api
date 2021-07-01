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
    async getCustomer(customerId) {
        const customer = await stripe.customers.retrieve(customerId);
        return customer;
    }
    async getPaymentMethods(customerId) {
        const customer = await this.getCustomer(customerId);
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });
        const index = paymentMethods.data.findIndex((item) => item.id === customer.invoice_settings.default_payment_method);
        if (paymentMethods.data[index]) {
            paymentMethods.data[index].isFavorite = true;
        }
        return paymentMethods;
    }
    async attachPaymentMethod(customerId, paymentMethodId) {
        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
        await stripe.setupIntents.create({
            customer: customerId,
            payment_method: paymentMethod.id,
            payment_method_types: ['card'],
            confirm: true,
        });
        return paymentMethod;
    }
    async detachPaymentMethod(customerId, paymentMethodId) {
        const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);
        await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });
        return paymentMethod;
    }
    async updatePaymentMethod(customerId, paymentMethodId) {
        const customer = await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });
        return customer;
    }
    async createPaymentIntent(customerId, paymentMethodId, bookingPrice) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: bookingPrice,
            currency: 'eur',
            customer: customerId,
            payment_method: paymentMethodId,
            confirm: true,
        });
        return paymentIntent;
    }
    async createBankAccount(accountId, data) {
        const token = await stripe.tokens.create({
            bank_account: {
                country: 'FR',
                currency: 'eur',
                account_holder_name: data.holderName,
                account_holder_type: 'individual',
                account_number: data.account_number,
            },
        });
        await stripe.accounts.createExternalAccount(accountId, {
            external_account: token.id,
        });
        return this.getBankAccount(accountId);
    }
    async updateDefaultBankAccount(accountId, bankAccountId) {
        await stripe.accounts.updateExternalAccount(accountId, bankAccountId, {
            default_for_currency: true,
        });
        return this.getBankAccount(accountId);
    }
    async removeBankAccount(accountId, bankAccountId) {
        await stripe.accounts.deleteExternalAccount(accountId, bankAccountId);
        return this.getBankAccount(accountId);
    }
    async getBankAccount(accountId) {
        return await stripe.accounts.retrieve(accountId);
    }
    async getBalance(accountId) {
        return await stripe.balance.retrieve({
            stripeAccount: accountId,
        });
    }
    async initSetupIntent(customerId, paymentMethodId) {
        const setupIntent = await stripe.setupIntents.create({
            customer: customerId,
            payment_method: paymentMethodId,
            payment_method_types: ['card'],
            confirm: true,
        });
        return setupIntent;
    }
};
PaymentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map