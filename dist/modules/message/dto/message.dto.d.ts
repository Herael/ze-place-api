import { Conversation } from 'src/modules/conversation/interfaces/conversation.interface';
import { Customer } from 'src/modules/customer/interfaces/customer.interface';
export declare class MessageDTO {
    readonly conversation: Conversation;
    readonly sender: Customer;
    readonly reciever: Customer;
    readonly text: string;
}
