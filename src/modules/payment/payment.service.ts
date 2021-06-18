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
    const user: Customer = await this.customerService.findByEmail(token.email);
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

  async createBankAccount(userId: string, data) {
    const token = await stripe.tokens.create({
      bank_account: {
        country: 'FR',
        currency: 'eur',
        account_holder_name: `${data.firstname} ${data.lastname}`,
        account_holder_type: 'individual',
        account_number: data.account_number,
      },
    });

    await stripe.accounts.createExternalAccount('acct_1J3gp8RDio72fPDz', {
      external_account: token.id,
    });
  }

  async addPaymentMethod(stripeAccountId: string, cardToken: string) {
    const card = await stripe.accounts.createExternalAccount(
      'acct_1J3gp8RDio72fPDz',
      {
        external_account: cardToken,
      },
    );
    // console.log('CARD', card);
    // // const payout = await stripe.payouts.create({
    // //   amount: 1000,
    // //   currency: 'eur',
    // //   method: 'instant',
    // // }, {
    // //   stripeAccount: 'acct_1J3dsmRHm1vUa4tU',
    // });
    // stripe.transfers.create({
    //   amount: 400,
    //   currency: 'eur',
    //   destination: 'acct_1J3gp8RDio72fPDz',
    // });
  }
}
