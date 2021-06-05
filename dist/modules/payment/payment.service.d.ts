import { CustomerService } from '../customer/customer.service';
export declare class PaymentService {
    private customerService;
    constructor(customerService: CustomerService);
    createPaymentIntent(token: any, bookingPrice: number): Promise<{
        paymentIntent: any;
        ephemeralKey: any;
        customer: string;
    }>;
}
