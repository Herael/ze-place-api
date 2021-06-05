import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoSchema } from './schemas/promo.schema';


@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'Promo', schema: PromoSchema }]),
  ],

  providers: [PromoService],
  controllers: [PromoController],
  exports: [PromoService],

})
export class PromoModule {}
