import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../customer/interfaces/customer.interface';
import { Promo } from '../promo/interfaces/promo.interface';
import { Charges } from './interfaces/charges.interface';
import { ChargesTO } from './dto/charges.dto';

@Injectable()
export class ChargesService {
    constructor(
        @InjectModel('Charges') private readonly chargesModel: Model<Charges>,
      ) {}
     
      async createTVA(body:ChargesTO): Promise<Charges> {
        
        const charges = await this.chargesModel.findOne({name:body.name}).exec();
        let chargesUpdate
        if(charges){
            chargesUpdate = await this.chargesModel.findOneAndUpdate({name:body.name},{value:body.value}).exec();
        }else{
            chargesUpdate = await new this.chargesModel(body).save();
        }
        return chargesUpdate;
      }

      async createService(body:ChargesTO): Promise<Charges> {
        const charges = await this.chargesModel.findOne({name:body.name}).exec();
        let chargesUpdate
        if(charges){
            chargesUpdate = await this.chargesModel.findOneAndUpdate({name:body.name},{value:body.value}).exec();
        }else{
            chargesUpdate = await new this.chargesModel(body).save();
        }
        return chargesUpdate;
      }
}
