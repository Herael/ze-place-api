import { PromoService } from './promo.service';
export declare class PromoController {
    private promoService;
    constructor(promoService: PromoService);
    create(req: any): Promise<import("./interfaces/promo.interface").Promo>;
    getCode(res: any): Promise<any>;
    getSevralCode(res: any, req: any): Promise<any>;
}
