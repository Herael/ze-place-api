import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CustomerService } from '../customer/customer.service';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule, PaymentModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
