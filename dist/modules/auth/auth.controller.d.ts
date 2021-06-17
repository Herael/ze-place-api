import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        userId: any;
    }>;
    register(req: any): Promise<{
        access_token: string;
        userId: any;
    }>;
    me(req: any): Promise<import("../customer/interfaces/customer.interface").Customer>;
}
