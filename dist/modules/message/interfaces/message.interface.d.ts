import { Document } from 'mongoose';
import { Conversation } from 'src/modules/conversation/interfaces/conversation.interface';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
export interface Message extends Document {
    conversation: Conversation;
    sender: Customer;
    reciever: Customer;
    text: string;
    created_at: Date;
}
