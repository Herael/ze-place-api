import { Feature } from 'src/modules/feature/interfaces/feature.interface';

export class BookingDTO {
  placeId: string;
  booking: {
    readonly features: Feature[];
    readonly bookingPeriod: {
      readonly startDate: string;
      readonly endDate: string;
      readonly duration: number;
    };
    readonly description: string;
  };
}
