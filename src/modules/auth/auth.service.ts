import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
import { compare } from 'bcrypt';

const stripe = require('stripe')(
  'sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7',
);

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.customerService.findByEmail(email);
    const isValid = await compare(password, user.password);
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Customer) {
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user._id,
    };
  }

  async register(customer: Customer) {
    const token = await this.createToken(customer);
    const account = await stripe.accounts.create({
      type: 'custom',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      account_token: token.id,
    });
    customer.stripeAccount = account.id;
    const user = await this.customerService.addCustomer(customer);
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user._id,
    };
  }

  async createToken(customer: Customer) {
    console.log(customer.birthdate);
    try {
      const token = await stripe.tokens.create({
        account: {
          business_type: 'individual',
          individual: {
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            address: {
              city: customer.location.city,
              country: 'FR',
              postal_code: customer.location.postalCode,
              line1: customer.location.address,
            },
            dob: {
              day: 25,
              month: 12,
              year: 1995,
            },
            gender: customer.gender,
            phone: `+33${customer.phoneNumber.substring(1)}`,
          },
          tos_shown_and_accepted: true,
        },
      });
      return token;
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(credentials) {
    return await this.customerService.findById(credentials.id);
  }
}
