import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/init')
  async init(@Res() res, @Req() req) {
    console.log(req.body);
    console.log(req.user);
    const customer = await this.paymentService.createPaymentIntent(
      req.user,
      req.body.bookingPrice,
    );
    return res.status(HttpStatus.OK).json(customer);
  }
}
