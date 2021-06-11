import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPlaces(@Request() req, @Res() res) {
    const places = await this.placeService.getAllPlaces(req.user.id);
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
  async createPlace(@Res() res, @Body() createPlaceDTO: CreatePlaceDTO) {
    const place = await this.placeService.createPlace(createPlaceDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been created successfully',
      place,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/similarPlaces')
  async similarPlaces(@Res() res, @Body() body) {
    const places = await this.placeService.similarPlaces(body.placeID);
    return res.status(HttpStatus.OK).json({
      message: 'Similar places has been get successfully',
      places,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/searchPlaces')
  async searchPlaces(@Res() res, @Body() body) {
    const places = await this.placeService.searchPlaces(
      body.placeTypeName,
      body.price,
      body.surface,
      body.features,
      body.location,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Search places has been get successfully',
      places,
    });
  }
}
