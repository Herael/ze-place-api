import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async booking(@Req() req, @Res() res, @Body() body) {
    const booking = await this.bookingService.bookPlace(req.user.id, {
      ownerId: body.booking.ownerId,
      placeId: body.booking.placeId,
      feature: body.booking.features[0],
      startDate: body.booking.startDate,
      endDate: body.booking.endDate,
      duration: body.booking.duration,
      price: body.booking.price,
      description: body.booking.description,
    });
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
      booking,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:placeId/user')
  async getBookingsByPlaceAndUser(@Req() req, @Res() res) {
    const bookings = await this.bookingService.getBookingsByPlaceAndUser(
      req.user.id,
      req.params.placeId,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by place and user',
      bookings,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getBookingsByUser(@Req() req, @Res() res) {
    const bookings = await this.bookingService.getBookingsByUser(req.user.id);
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by user',
      bookings,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/owner')
  async getBookingsByOwner(@Req() req, @Res() res) {
    const bookings = await this.bookingService.getBookingsByOwner(req.user.id);
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by owner',
      bookings,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:placeId')
  async getBookingsByPlace(@Req() req, @Res() res) {
    const bookings = await this.bookingService.getBookingsByPlace(
      req.params.placeId,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by place',
      bookings,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:bookingId/accept')
  async acceptBooking(@Req() req, @Res() res) {
    const booking = await this.bookingService.acceptBooking(
      req.params.bookingId,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by place',
      booking,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:bookingId/deny')
  async denyBooking(@Req() req, @Res() res) {
    const booking = await this.bookingService.denyBooking(
      req.user.id,
      req.params.bookingId,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Get bookings by place',
      booking,
    });
  }
}
