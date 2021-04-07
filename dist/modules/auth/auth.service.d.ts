import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
export declare class AuthService {
    private customerService;
    private jwtService;
    constructor(customerService: CustomerService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: Customer): Promise<{
        access_token: string;
    }>;
}
