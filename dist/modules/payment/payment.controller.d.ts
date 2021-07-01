import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    init(res: any, req: any): Promise<any>;
    getCustomer(res: any, req: any): Promise<any>;
    getPaymentMethods(res: any, req: any): Promise<any>;
    attachPaymentMethod(res: any, req: any): Promise<any>;
    detachPaymentMethod(res: any, req: any): Promise<any>;
    updatePaymentMethod(res: any, req: any): Promise<any>;
    createBankAccount(res: any, req: any): Promise<any>;
    updateDefaultBankAccount(res: any, req: any): Promise<any>;
    removeBankAccount(res: any, req: any): Promise<any>;
    getBankAccount(res: any, req: any): Promise<any>;
    getBalance(res: any, req: any): Promise<any>;
    initSetupIntent(res: any, req: any): Promise<any>;
}
