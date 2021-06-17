import { Injectable } from '@nestjs/common';
import { Ticket } from './interfaces/ticket.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BugTicketService {
    @InjectModel('Ticket') private readonly ticketModel: Model<Ticket>

    async addTicket(data:Ticket): Promise<Ticket>{
        const ticket = await new this.ticketModel(data).save();
        return ticket;
    }

    async getTicket():Promise<Ticket[]>{
        const ticket = await this.ticketModel.find().exec();
        console.log(ticket);
        
        return ticket;
    }
    async changeTag(data):Promise<Ticket>{
        console.log('tag');
        
        const ticket = await this.ticketModel.findByIdAndUpdate(data.id,{tag:data.tag})        
        return ticket;
    }

}
