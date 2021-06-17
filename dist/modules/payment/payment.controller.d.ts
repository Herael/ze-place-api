import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    init(res: any, req: any): Promise<any>;
    payout(res: any, req: any): Promise<any>;
}
