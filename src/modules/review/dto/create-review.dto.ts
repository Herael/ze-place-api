import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export class CreateReviewDTO {
  readonly from: Customer;
  readonly text: string;
  readonly rate: number;
  readonly created_at: Date;
}
