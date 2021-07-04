import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePlaceDTO } from './dto/create-place.dto';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getAllPlaces(@Request() req, @Res() res) {
    const places = await this.placeService.getAllPlaces(
      req.user.id,
      req.body.limit,
    );
    return res.status(HttpStatus.OK).json(places);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/shuffle')
  async getAllPlacesShuffle(@Request() req, @Res() res) {
    const places = await this.placeService.getAllPlacesShuffle(
      req.user.id,
      req.body.limit,
    );
    return res.status(HttpStatus.OK).json(places);
  }

  @Get('/admin')
  async getAllPlacesAdmin(@Request() req, @Res() res) {
    const places = await this.placeService.getAllPlacesAdmin();
    return res.status(HttpStatus.OK).json(places);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPlaceById(@Request() req, @Res() res) {
    const places = await this.placeService.findById(req.user.id, req.params.id);
    return res.status(HttpStatus.OK).json(places);
  }

  @Post('/nearby')
  async getPlacesNearbyCoordinates(@Res() res, @Body() data) {
    const places = await this.placeService.getPlacesNearbyCoordinates(
      data.coords,
      data.distance,
      data.limit,
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
  @Post('/update')
  async updatePlace(@Res() res, @Body() createPlaceDTO: CreatePlaceDTO) {
    const place = await this.placeService.updatePlace(createPlaceDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been updated successfully',
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
      body.placeType,
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

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deletePlace(@Res() res, @Query('placeID') placeId) {
    return await this.placeService.deletePlace(placeId);
  }
}
