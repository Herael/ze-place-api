import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export class CreateReviewDTO {
  @IsNotEmpty()
  readonly from: Customer;

  @IsString()
  readonly text: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  readonly rate: number;

  readonly created_at: Date;
}
