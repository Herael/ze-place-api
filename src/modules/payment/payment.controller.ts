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
    const bankAccount = await this.paymentService.createBankAccount(
      req.body.accountId,
      {
        holderName: req.body.holderName,
        bank_name: req.body.bank_name,
        account_number: req.body.account_number,
      },
    );
    return res.status(HttpStatus.OK).json(bankAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/bankAccount/update')
  async updateDefaultBankAccount(@Res() res, @Req() req) {
    const bankAccount = await this.paymentService.updateDefaultBankAccount(
      req.body.accountId,
      req.body.bankAccountId,
    );
    return res.status(HttpStatus.OK).json(bankAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/bankAccount/remove')
  async removeBankAccount(@Res() res, @Req() req) {
    const bankAccount = await this.paymentService.removeBankAccount(
      req.body.accountId,
      req.body.bankAccountId,
    );
    return res.status(HttpStatus.OK).json(bankAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bankAccount/:id')
  async getBankAccount(@Res() res, @Req() req) {
    const bankAccount = await this.paymentService.getBankAccount(req.params.id);
    return res.status(HttpStatus.OK).json(bankAccount);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/token')
  // async payout(@Res() res, @Req() req) {
  //   const token = await this.paymentService.createToken();
  //   return res.status(HttpStatus.OK).json(token);
  // }
}
