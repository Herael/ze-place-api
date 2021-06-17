import { BugTicketService } from './bug-ticket.service';
export declare class BugTicketController {
    private ticketService;
    constructor(ticketService: BugTicketService);
    addBugTicket(res: any, req: any): Promise<any>;
    getBugTicket(res: any): Promise<any>;
    changeTag(res: any, req: any): Promise<any>;
}
