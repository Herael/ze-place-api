import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTicketDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly senderId: string;

  readonly created_at: Date;
}
