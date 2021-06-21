import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    init(res: any, req: any): Promise<any>;
    confirm(res: any, req: any): Promise<any>;
    createBankAccount(res: any, req: any): Promise<any>;
    updateDefaultBankAccount(res: any, req: any): Promise<any>;
    removeBankAccount(res: any, req: any): Promise<any>;
    getBankAccount(res: any, req: any): Promise<any>;
}
