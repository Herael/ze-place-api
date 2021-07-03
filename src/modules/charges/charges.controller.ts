import { Controller, Post, Req, Res, Body, HttpStatus, Get } from '@nestjs/common';
import { ChargesService } from './charges.service';

@Controller('charges')
export class ChargesController {
    constructor(private chargesService: ChargesService) {}


  @Post('/createTVA')
  async createTVA(@Req() req, @Res() res, @Body() body) {
    const charges = await this.chargesService.createTVA(body);
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      charges,
    });
  }

  @Post('/createService')
  async createService(@Req() req, @Res() res, @Body() body) {
    const charges = await this.chargesService.createService(body);
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      charges,
    });
  }

  @Get('/getTVA')
  async getTVA(@Req() req, @Res() res) {
    const charges = await this.chargesService.getTVA();
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      charges,
    });
  }

  @Get('/getService')
  async getService(@Req() req, @Res() res) {
    const charges = await this.chargesService.getService();
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      charges,
    });
  }

    
}
