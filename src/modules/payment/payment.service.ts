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
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: user.customerId,
    };
  }

  async createPayout(token, bookingPrice: number) {
    const user: Customer = await this.customerService.findByEmail(token.email);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: user.customerId },
      { apiVersion: '2020-08-27' },
    );

    const paymentIntent = await stripe.payouts.create({
      amount: bookingPrice,
      currency: 'eur',
      destination: user.customerId,
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: user.customerId,
    };
  }
}
