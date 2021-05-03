import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
import { compare } from 'bcrypt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    };
  }

  async register(customer: Customer) {
    const user = await this.customerService.addCustomer(customer);
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUser(credentials) {
    return await this.customerService.findById(credentials.id);
  }
}
