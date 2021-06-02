import { Document } from 'mongoose';
import { Feature } from 'src/modules/feature/interfaces/feature.interface';

export interface Booking extends Document {
  readonly userId: string;
  readonly feature: Feature;
  readonly bookingPeriod: {
    readonly startDate: string;
    readonly endDate: string;
    readonly duration: number;
  };
  readonly description: string;
}
