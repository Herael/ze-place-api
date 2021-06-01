import { Promo } from './interfaces/promo.interface';
import { Model } from 'mongoose';
export declare class CodeId {
    id: [String];
}
export declare class PromoService {
    private readonly promoModel;
    constructor(promoModel: Model<Promo>);
    createPromo(promo: Promo): Promise<Promo>;
    getCode(): Promise<Promo[]>;
    getCodeById(id: String): Promise<Promo>;
    getSevralCode(req: any): Promise<Promo[]>;
}
