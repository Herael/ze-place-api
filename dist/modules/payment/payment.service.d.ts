import { CustomerService } from '../customer/customer.service';
export declare class PaymentService {
    private customerService;
    constructor(customerService: CustomerService);
    createPaymentIntent(token: any, bookingPrice: number): Promise<{
        paymentIntent: any;
        ephemeralKey: any;
        customer: string;
    }>;
    createBankAccount(accountId: string, data: any): Promise<any>;
    updateDefaultBankAccount(accountId: string, bankAccountId: string): Promise<any>;
    removeBankAccount(accountId: string, bankAccountId: string): Promise<any>;
    getBankAccount(accountId: string): Promise<any>;
    addPaymentMethod(stripeAccountId: string, cardToken: string): Promise<void>;
}
