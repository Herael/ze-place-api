export class CreateCustomerDTO {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
  readonly created_at: Date;
}
