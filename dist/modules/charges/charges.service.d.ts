import { Model } from 'mongoose';
import { Charges } from './interfaces/charges.interface';
import { ChargesTO } from './dto/charges.dto';
export declare class ChargesService {
    private readonly chargesModel;
    constructor(chargesModel: Model<Charges>);
    createTVA(body: ChargesTO): Promise<Charges>;
    createService(body: ChargesTO): Promise<Charges>;
}
