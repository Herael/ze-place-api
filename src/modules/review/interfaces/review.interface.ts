import { Document } from 'mongoose';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export interface Review extends Document {
  readonly from: Customer;
  readonly text: string;
  readonly rate: number;
  readonly created_at: Date;
}
