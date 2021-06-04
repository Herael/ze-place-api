import { Feature } from 'src/modules/feature/interfaces/feature.interface';

export class BookingDTO {
  readonly feature: Feature;
  readonly startDate: string;
  readonly endDate: string;
  readonly duration: number;
  readonly price: number;
  readonly description: string;
  readonly isAccepted: boolean;
}
