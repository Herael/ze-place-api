import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
import { compare } from 'bcrypt';
import { Script } from 'node:vm';
import { PythonShell } from 'python-shell';

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
      user: user,
    };
  }

  async uploadID(data) {
    //request here for python
    const IDRecto = await stripe.files.create({
      purpose: 'identity_document',
      file: {
        data: data[0].buffer,
        name: data[0].originalName,
        type: 'application/octet-stream',
      },
    });
    const IDVerso = await stripe.files.create({
      purpose: 'identity_document',
      file: {
        data: data[1].buffer,
        name: data[1].originalName,
        type: 'application/octet-stream',
      },
    });
    return [IDRecto.id, IDVerso.id];
  }

  async register(customer: Customer) {
    const token = await this.createToken(customer);
    const account = await stripe.accounts.create({
      type: 'custom',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        support_url: 'www.google.com',
        url: 'www.google.com',
        mcc: '6513',
      },
      account_token: token.id,
    });
    customer.stripeAccount = account.id;
    const user = await this.customerService.addCustomer(customer);
    if (user == null) {
      return null;
    }
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async createToken(customer: Customer) {
    const birthdate = customer.birthdate.toString().split('-');

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
              day: birthdate[2].substr(0, 2),
              month: birthdate[1],
              year: birthdate[0],
            },
            gender: customer.gender,
            phone: `+33${customer.phoneNumber.substring(1)}`,
            verification: {
              document: {
                back: customer.IDVerso,
                front: customer.IDRecto,
              },
              additional_document: {
                back: customer.IDVerso,
                front: customer.IDRecto,
              },
            },
          },
          tos_shown_and_accepted: true,
        },
      });
      return token;
    } catch (err) {
    }
  }

  async getUser(credentials) {
    return await this.customerService.findById(credentials.id);
  }

  runPython() {
    const pythonFolder = 'ml/';

    PythonShell.defaultOptions = {
      scriptPath: pythonFolder,
    };

    PythonShell.run('script.py', null, function (err, results) {
      if (err) {
        return;
      }
    });
    return;
  }
}
