import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
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
  async createPlace(@Res() res, @Body() createPlaceDTO: CreatePlaceDTO) {
    const place = await this.placeService.createPlace(createPlaceDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been created successfully',
      place,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/booking')
  async booking(@Request() req, @Res() res, @Body() body) {
    await this.placeService.bookPlace(req.user.id, body.placeId, {
      feature: body.booking.features[0],
      startDate: body.booking.startDate,
      endDate: body.booking.endDate,
      duration: body.booking.duration,
      price: body.booking.price,
      description: body.booking.description,
      isAccepted: false,
    });
    return res.status(HttpStatus.OK).json({
      message: 'Place has been booked successfully',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:placeId/bookings')
  async bookings(@Res() res, @Request() req) {
    const bookings = await this.placeService.getBookings(req.params.placeId);
    return res.status(HttpStatus.OK).json({
      message: 'Place has been booked successfully',
      bookings,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/booking/accept')
  async acceptBooking(@Res() res, @Body() body) {
    const bookings = await this.placeService.acceptBooking(
      body.placeId,
      body.bookingId,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been accepted',
      bookings: bookings,
    });
  }
}
