import { ChargesService } from './charges.service';
export declare class ChargesController {
    private chargesService;
    constructor(chargesService: ChargesService);
    createTVA(req: any, res: any, body: any): Promise<any>;
    createService(req: any, res: any, body: any): Promise<any>;
}
