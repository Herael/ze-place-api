import { Customer } from 'src/modules/customer/interfaces/customer.interface';
import { Feature } from './feature/interfaces/feature.interface';

export type Image = {
  name: string;
  url: string;
};

export type Location = {
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
};

export type Coords = {
  longitude: number;
  latitude: number;
};

export type BookingClient = {
  features: Feature;
  bookingPeriod: {
    startDate?: string;
    endDate?: string;
    duration?: number;
  };
  description: string;
};

export type Availability = {
  userId: string;
  date: string;
  disabled: boolean;
};
