import { CustomerService } from '../customer/customer.service';
export declare class PaymentService {
    private customerService;
    constructor(customerService: CustomerService);
    getCustomer(customerId: string): Promise<any>;
    getPaymentMethods(customerId: string): Promise<any>;
    attachPaymentMethod(customerId: string, paymentMethodId: string): Promise<any>;
    detachPaymentMethod(customerId: string, paymentMethodId: string): Promise<any>;
    updatePaymentMethod(customerId: string, paymentMethodId: string): Promise<any>;
    createPaymentIntent(customerId: string, paymentMethodId: string): Promise<any>;
    createBankAccount(accountId: string, data: any): Promise<any>;
    updateDefaultBankAccount(accountId: string, bankAccountId: string): Promise<any>;
    removeBankAccount(accountId: string, bankAccountId: string): Promise<any>;
    getBankAccount(accountId: string): Promise<any>;
    getBalance(accountId: string): Promise<any>;
    initSetupIntent(customerId: string, paymentMethodId: string): Promise<any>;
}
