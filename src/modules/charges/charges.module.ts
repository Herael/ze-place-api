import { Module } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ChargesController } from './charges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChargesSchema } from './schema/charges.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Charges', schema: ChargesSchema }]),
  ],

  providers: [ChargesService],
  controllers: [ChargesController],
  exports: [ChargesService],

})
export class ChargesModule {}
