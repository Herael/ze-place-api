import { Ticket } from './interfaces/ticket.interface';
export declare class BugTicketService {
    private readonly ticketModel;
    addTicket(data: Ticket): Promise<Ticket>;
    getTicket(): Promise<Ticket[]>;
    changeTag(data: any): Promise<Ticket>;
}
