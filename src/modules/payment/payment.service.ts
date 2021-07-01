import { Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/interfaces/customer.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7',
);

@Injectable()
export class PaymentService {
  constructor(private customerService: CustomerService) {}

  async getCustomer(customerId: string) {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  }

  async getPaymentMethods(customerId: string) {
    const customer = await this.getCustomer(customerId);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    const index = paymentMethods.data.findIndex(
      (item) => item.id === customer.invoice_settings.default_payment_method,
    );
    if (paymentMethods.data[index]) {
      paymentMethods.data[index].isFavorite = true;
    }
    return paymentMethods;
  }

  async attachPaymentMethod(customerId: string, paymentMethodId: string) {
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

  async detachPaymentMethod(customerId: string, paymentMethodId: string) {
    const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
    return paymentMethod;
  }

  async updatePaymentMethod(customerId: string, paymentMethodId: string) {
    const customer = await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
    return customer;
  }

  async createPaymentIntent(customerId: string, paymentMethodId: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'eur',
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
    });
    return paymentIntent;
  }

  async createBankAccount(accountId: string, data) {
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

  async updateDefaultBankAccount(accountId: string, bankAccountId: string) {
    await stripe.accounts.updateExternalAccount(accountId, bankAccountId, {
      default_for_currency: true,
    });
    return this.getBankAccount(accountId);
  }

  async removeBankAccount(accountId: string, bankAccountId: string) {
    await stripe.accounts.deleteExternalAccount(accountId, bankAccountId);
    return this.getBankAccount(accountId);
  }

  async getBankAccount(accountId: string) {
    return await stripe.accounts.retrieve(accountId);
  }

  async getBalance(accountId: string) {
    return await stripe.balance.retrieve({
      stripeAccount: accountId,
    });
  }

  async initSetupIntent(customerId: string, paymentMethodId: string) {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
      payment_method_types: ['card'],
      confirm: true,
    });
    return setupIntent;
  }
}
