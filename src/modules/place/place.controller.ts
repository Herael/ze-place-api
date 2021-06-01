import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  async getAllPlaces(@Res() res) {
    const places = await this.placeService.getAllPlaces();
    return res.status(HttpStatus.OK).json(places);
  }

  @Post()
  async getPlacesNearbyCoordinates(@Res() res, @Body() data) {
    const places = await this.placeService.getPlacesNearbyCoordinates(
      data.coords,
      data.distance,
    );
    return res.status(HttpStatus.OK).json(places);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPlace(@Res() res , @Body() createPlaceDTO: CreatePlaceDTO) {
    
    const place = await this.placeService.createPlace(createPlaceDTO,);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been created successfully',
      place,
    });
  }
}
