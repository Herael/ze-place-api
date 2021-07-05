import { Injectable } from '@nestjs/common';
import { Promo } from './interfaces/promo.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


export class CodeId {

  id:[String]
}

@Injectable()
export class PromoService {
    constructor(
        @InjectModel('Promo') private readonly promoModel: Model<Promo>,
      ) {}

      async createPromo(promo: Promo): Promise<Promo> {
          return await new  this.promoModel(promo).save();
          
      }

      async getCode(): Promise<Promo[]> {
          const code = await this.promoModel.find().exec();
          return code;
      }

      async getCodeById(id:String): Promise<Promo>{
          const code = await this .promoModel.findById(id).exec();
          return code ;
      }

      async getSevralCode(req) {
          
          const value = await this.promoModel.find({
            '_id': { $in: req.code}})
            return value
        
    }
    

}
