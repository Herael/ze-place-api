import { Controller, Post, Req, Res, Body, HttpStatus } from '@nestjs/common';
import { ChargesService } from './charges.service';

@Controller('charges')
export class ChargesController {
    constructor(private chargesService: ChargesService) {}


  @Post('/createTVA')
  async createTVA(@Req() req, @Res() res, @Body() body) {
    const booking = await this.chargesService.createTVA(body);
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      booking,
    });
  }

  @Post('/createService')
  async createService(@Req() req, @Res() res, @Body() body) {
    const booking = await this.chargesService.createService(body);
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      booking,
    });
  }

    
}
