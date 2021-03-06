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
      title: `${place.title}`,
      subtitle: 'Your place has been booked',
      description: `${user.first_name} ${user.last_name} has booked your place, send him a message now !`,
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
    const owner = await this.customerModel.findById(booking.ownerId);
    const user = await this.customerModel.findById(booking.userId);
    const place = await this.placeModel.findById(booking.placeId);
    const placeBooking = place.bookings.find(
      (booking) => booking._id.toString() === bookingId.toString(),
    );
    placeBooking.isAccepted = true;
    place.save();
    sendPushNotifications({
      pushId: user.pushToken,
      title: `${place.title}`,
      subtitle: `${owner.first_name} has accepted your reservation`,
      description:
        'Find it in the reservation tab, you can continue to discuss with the owner',
    });
    booking.isAccepted = true;
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
    const placeBooking = place.bookings.find(
      (booking) => booking._id.toString() === bookingId.toString(),
    );
    placeBooking.isDenied = true;
    placeBooking.isAccepted = false;
    place.save();
    await stripe.refunds.create({
      payment_intent: booking.paymentId,
    });

    if (userId === booking.userId) {
      sendPushNotifications({
        pushId: owner.pushToken,
        title: `${place.title}`,
        subtitle: `${user.first_name} canceled his reservation`,
        description: `A refund has been made, send him a message to find out why...`,
      });
    } else {
      sendPushNotifications({
        pushId: user.pushToken,
        title: `${place.title}`,
        subtitle: `${owner.first_name} canceled your reservation`,
        description:
          'Your reservation has been canceled, you will be refunded shortly.',
      });
    }
    booking.isAccepted = false;
    booking.isDenied = true;
    booking.isPast = true;
    booking.save();
    return booking;
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async sendPaymentToClient() {
    const tva = 1.2;
    const fees = 1.2;
    const bookings = await this.getBookingsOfTheDay();
    if (bookings.length > 0) {
      bookings.forEach(async (booking) => {
        const owner = await this.customerModel.findById(booking.ownerId);
        const bookingModel = await this.bookingModel.findById(booking._id);
        const place = await this.placeModel.findById(booking.placeId);
        if (owner != null && owner.stripeAccount) {
          bookingModel.isPaid = true;
          bookingModel.save();
          const priceHT = (booking.price * booking.duration * 100) / tva;
          const priceOwner = priceHT / fees;
          stripe.transfers.create({
            amount: priceOwner,
            currency: 'eur',
            destination: owner.stripeAccount,
          });
          sendPushNotifications({
            pushId: owner.pushToken,
            title: `${place.title}`,
            subtitle: `New bank transfer`,
            description: `The transfer of ${booking.price}??? from ${booking.firstname} has been made, find it directly in your account within 2 days.`,
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
        const owner = await this.customerModel.findById(booking.ownerId);
        const place = await this.placeModel.findById(booking.placeId);
        sendPushNotifications({
          pushId: owner.pushToken,
          title: `${place.title}`,
          subtitle: `Reservation completed`,
          description: `${booking.firstname}'s booking has ended !`,
        });
        bookingModel.isPast = true;
        bookingModel.save();
      });
    }
  }
}
