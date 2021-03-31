import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.placeService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }
}
