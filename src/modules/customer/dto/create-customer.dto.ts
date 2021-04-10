import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDTO {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(2, 64)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly created_at: Date;
}
