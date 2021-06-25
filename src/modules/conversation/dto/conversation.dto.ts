import { IsString, IsNotEmpty } from 'class-validator';

export class ConversationDTO {
  @IsString()
  @IsNotEmpty()
  readonly placeId: string;

  @IsString()
  @IsNotEmpty()
  readonly senderId: string;

  @IsString()
  @IsNotEmpty()
  readonly ownerId: string;
}
