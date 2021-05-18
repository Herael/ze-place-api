import { PromoService } from './promo.service';
import { Controller, Request, Post, UseGuards, Logger, Get, Res, HttpStatus } from '@nestjs/common';
import { async } from 'rxjs';


@Controller('promo')
export class PromoController {

    constructor(private promoService: PromoService) {}

    @Post('/create')
    async create(@Request() req) {
      console.log(req.body);
      
      return this.promoService.createPromo(req.body);
    }

    @Get('/getCode')
    async getCode(@Res() res){
      const code = await this.promoService.getCode();
      return res.status(HttpStatus.OK).json(code)
    }

}
