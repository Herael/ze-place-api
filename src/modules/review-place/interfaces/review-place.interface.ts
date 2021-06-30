import { Document } from 'mongoose';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export interface ReviewPlace extends Document {

  readonly name: string;
  readonly description: string;
  readonly writerId: string;
  readonly writerName: string;
  readonly placeId: string;
  readonly rate: number;
  readonly created_at: Date;
}
