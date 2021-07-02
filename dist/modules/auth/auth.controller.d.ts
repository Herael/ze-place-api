import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: import("../customer/interfaces/customer.interface").Customer;
    }>;
    register(req: any): Promise<{
        access_token: string;
        user: import("../customer/interfaces/customer.interface").Customer;
    }>;
    uploadID(req: any, files: any): Promise<any[]>;
    me(req: any): Promise<import("../customer/interfaces/customer.interface").Customer>;
    runPyhon(): Promise<void>;
}
