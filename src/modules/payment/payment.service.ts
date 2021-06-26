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

  async createPaymentIntent(token, bookingPrice: number) {
    const user: Customer = await this.customerService.findById(token.id);
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: user.customerId },
      { apiVersion: '2020-08-27' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingPrice,
      currency: 'eur',
      customer: user.customerId,
    });
    return {
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey.secret,
      customer: user.customerId,
    };
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
}
