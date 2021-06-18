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
    const customer = await this.paymentService.createPaymentIntent(
      req.user,
      req.body.bookingPrice,
    );
    return res.status(HttpStatus.OK).json(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/paymentMethod/add')
  async confirm(@Res() res, @Req() req) {
    const customer = await this.paymentService.addPaymentMethod(
      req.user,
      req.body.cardToken,
    );
    return res.status(HttpStatus.OK).json(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/bankAccount/new')
  async createBankAccount(@Res() res, @Req() req) {
    const customer = await this.paymentService.createBankAccount(req.user, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      bank_name: req.body.bank_name,
      country: req.body.country,
      currency: req.body.currency,
      account_number: req.body.account_number,
    });
    return res.status(HttpStatus.OK).json(customer);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/token')
  // async payout(@Res() res, @Req() req) {
  //   const token = await this.paymentService.createToken();
  //   return res.status(HttpStatus.OK).json(token);
  // }
}
