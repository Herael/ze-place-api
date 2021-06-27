import { IsNotEmpty, IsString } from 'class-validator';
import { Conversation } from 'src/modules/conversation/interfaces/conversation.interface';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';

export class MessageDTO {
  @IsNotEmpty()
  readonly conversationId: string;

  @IsNotEmpty()
  readonly senderId: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
