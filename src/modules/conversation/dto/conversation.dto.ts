import { IsString, IsNotEmpty } from 'class-validator';

export class ConversationDTO {
  @IsString()
  @IsNotEmpty()
  readonly placeId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly ownerId: string;
}
