import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendPushNotifications } from 'src/utils';
import { Customer } from '../customer/interfaces/customer.interface';
import { Place } from '../place/interfaces/place.interface';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from './interfaces/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    @InjectModel('Place') private readonly placeModel: Model<Place>,
  ) {}

  async bookPlace(userId: string, bookingDTO: BookingDTO) {
    const user = await this.customerModel.findById(userId);
    const place = await this.placeModel.findById(bookingDTO.placeId);
    const owner = await this.customerModel.findById(place.ownerId);
    const booking = {
      userId: user._id,
      firstname: user.first_name,
      lastname: user.last_name,
      avatar: user.avatar,
      placeCover: place.images[0].url,
      placeTitle: place.title,
      ...bookingDTO,
    };
    const newPlace = await new this.bookingModel(booking).save();
    place.bookings.push(newPlace._id);
    place.save();
    sendPushNotifications({
      pushId: owner.pushToken,
      title: 'Your place has been booked !',
      description: 'Check',
    });
  }

  async getBookingsByPlaceAndUser(
    userId: string,
    placeId: string,
  ): Promise<Booking[]> {
    return await this.bookingModel
      .find({ userId, placeId, isPast: false })
      .sort({ created_at: -1 })
      .exec();
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await this.bookingModel
      .find({ userId: userId })
      .sort({ created_at: -1 })
      .exec();
  }

  async getBookingsByOwner(userId: string): Promise<Booking[]> {
    return await this.bookingModel
      .find({ ownerId: userId })
      .sort({ created_at: -1 })
      .exec();
  }

  async getBookingsByPlace(placeId: string): Promise<Booking[]> {
    return await this.bookingModel
      .find({ placeId: placeId })
      .sort({ created_at: -1 })
      .exec();
  }

  async getBookings(): Promise<Booking[]> {
    return await this.bookingModel.find().sort({ created_at: -1 });
  }

  async acceptBooking(bookingId: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(bookingId);
    const user = await this.customerModel.findById(booking.userId);
    const owner = await this.customerModel.findById(booking.ownerId);
    sendPushNotifications({
      pushId: owner.pushToken,
      title: 'Test',
      description: 'test',
    });
    sendPushNotifications({
      pushId: user.pushToken,
      title: 'Test',
      description: 'test',
    });
    booking.isAccepted = true;
    booking.isPast = true;
    booking.save();
    return booking;
  }

  async denyBooking(userId: string, bookingId: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(bookingId);
    const user = await this.customerModel.findById(booking.userId);
    const owner = await this.customerModel.findById(booking.ownerId);
    sendPushNotifications({
      pushId: user.pushToken,
      title: 'Test',
      description: 'test',
    });
    sendPushNotifications({
      pushId: owner.pushToken,
      title: 'Test',
      description: 'test',
    });
    booking.isDenied = true;
    booking.isPast = true;
    booking.save();
    return booking;
  }
}
