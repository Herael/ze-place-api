import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { dateToAvailabilities, sendPushNotifications } from 'src/utils';
import { Customer } from '../customer/interfaces/customer.interface';
import { Place } from '../place/interfaces/place.interface';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from './interfaces/booking.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51IvjYaIeDqziwrFRLUS2L2qYbBDUL4YbhnwDVkU5S7bXNQmIaGh0wn24V9CxOao50ai5VOBrzMYDNXf5itqXSlSL00O3CdBEw7',
);

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
    const dates = dateToAvailabilities(
      user._id,
      new Date(booking.startDate),
      new Date(booking.endDate),
    );
    place.availabilities = [...place.availabilities, ...dates];
    place.save();
    sendPushNotifications({
      pushId: owner.pushToken,
      title: 'Your place has been booked !',
      description: 'Check',
    });
  }

  async getBookingsOfTheDay(): Promise<Booking[]> {
    const currentDate = new Date();
    const month = `${currentDate.getMonth() < 10 ? '0' : ''}${
      currentDate.getMonth() + 1
    }`;
    const day = `${
      currentDate.getDate() < 10 ? '0' : ''
    }${currentDate.getDate()}`;
    const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
    return await this.bookingModel
      .find({ startDate: formatDate, isAccepted: true, isPaid: false })
      .sort({ created_at: -1 })
      .exec();
  }

  async getEndedBookings(): Promise<Booking[]> {
    const currentDate = new Date();
    const month = `${currentDate.getMonth() < 10 ? '0' : ''}${
      currentDate.getMonth() + 1
    }`;
    const day = `${
      currentDate.getDate() < 10 ? '0' : ''
    }${currentDate.getDate()}`;
    const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
    return await this.bookingModel
      .find({ endDate: formatDate, isAccepted: true, isPaid: true })
      .sort({ created_at: -1 })
      .exec();
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
    const place = await this.placeModel.findById(booking.placeId);
    place.availabilities = place.availabilities.filter(
      (availabilities) => availabilities.userId !== booking.userId,
    );
    place.save();
    await stripe.refunds.create({
      payment_intent: booking.paymentId,
    });

    if (userId === booking.userId) {
      sendPushNotifications({
        pushId: owner.pushToken,
        title: 'Annulation de réservation',
        description: `${user.first_name} a annulé sa réservation pour ${booking.placeTitle}`,
      });
    } else {
      sendPushNotifications({
        pushId: user.pushToken,
        title: 'Annulation de réservation',
        description: `${owner.first_name} a annulé votre réservation pour ${booking.placeTitle}`,
      });
    }
    booking.isDenied = true;
    booking.isPast = true;
    booking.save();
    return booking;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendPaymentToClient() {
    const bookings = await this.getBookingsOfTheDay();
    if (bookings.length > 0) {
      bookings.forEach(async (booking) => {
        const owner = await this.customerModel.findById(booking.ownerId);
        const bookingModel = await this.bookingModel.findById(booking._id);
        if (owner != null && owner.stripeAccount) {
          bookingModel.isPaid = true;
          bookingModel.save();
          stripe.transfers.create({
            amount: booking.price * booking.duration * 100,
            currency: 'eur',
            destination: owner.stripeAccount,
          });
          sendPushNotifications({
            pushId: owner.pushToken,
            title: 'Virement réalisé',
            description: `La réservation de ${booking.firstname} a démarré, vous recevrez bientôt votre argent sur votre compte ZePlace`,
          });
        }
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async closeBookings() {
    const bookings = await this.getEndedBookings();
    if (bookings.length > 0) {
      bookings.forEach(async (booking) => {
        const bookingModel = await this.bookingModel.findById(booking._id);
        bookingModel.isPast = true;
        bookingModel.save();
      });
    }
  }
}
