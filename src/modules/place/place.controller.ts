import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPlaces(@Res() res) {
    Logger.warn(res.t);
    const places = await this.placeService.getAllPlaces();
    return res.status(HttpStatus.OK).json(places);
  }

  @Post('/create')
  async addPlace(@Res() res, @Body() createPlaceDTO: CreatePlaceDTO) {
    const place = await this.placeService.addPlace(createPlaceDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been created successfully',
      place,
    });
  }
}
