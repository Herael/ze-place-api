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
  @Post('/paymentIntent/create')
  async init(@Res() res, @Req() req) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      req.body.customerId,
      req.body.paymentMethodId,
    );
    return res.status(HttpStatus.OK).json(paymentIntent);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/customer/:customerId')
  async getCustomer(@Res() res, @Req() req) {
    const customer = await this.paymentService.getCustomer(
      req.params.customerId,
    );
    return res.status(HttpStatus.OK).json(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/paymentMethods/:customerId')
  async getPaymentMethods(@Res() res, @Req() req) {
    const paymentMethods = await this.paymentService.getPaymentMethods(
      req.params.customerId,
    );
    return res.status(HttpStatus.OK).json(paymentMethods);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/paymentMethods/add')
  async attachPaymentMethod(@Res() res, @Req() req) {
    const paymentMethod = await this.paymentService.attachPaymentMethod(
      req.body.customerId,
      req.body.paymentMethodId,
    );
    return res.status(HttpStatus.OK).json(paymentMethod);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/paymentMethods/remove')
  async detachPaymentMethod(@Res() res, @Req() req) {
    const paymentMethod = await this.paymentService.detachPaymentMethod(
      req.body.customerId,
      req.body.paymentMethodId,
    );
    return res.status(HttpStatus.OK).json(paymentMethod);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/paymentMethods/update')
  async updatePaymentMethod(@Res() res, @Req() req) {
    const paymentMethod = await this.paymentService.updatePaymentMethod(
      req.body.customerId,
      req.body.paymentMethodId,
    );
    return res.status(HttpStatus.OK).json(paymentMethod);
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

  @UseGuards(JwtAuthGuard)
  @Post('/balance')
  async getBalance(@Res() res, @Req() req) {
    const balance = await this.paymentService.getBalance(req.body.accountId);
    console.log(balance);
    return res.status(HttpStatus.OK).json(balance);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/setupIntent/create')
  async initSetupIntent(@Res() res, @Req() req) {
    const setupIntent = await this.paymentService.initSetupIntent(
      req.body.customerId,
      req.body.paymentMethodId,
    );
    return res.status(HttpStatus.OK).json(setupIntent);
  }
}
