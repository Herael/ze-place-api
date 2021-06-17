import { Module } from '@nestjs/common';
import { BugTicketController } from './bug-ticket.controller';
import { TicketSchema } from './schemas/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BugTicketService } from './bug-ticket.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
  ],
  controllers: [BugTicketController],
  providers: [BugTicketService],
  exports: [BugTicketService],
})
export class BugTicketModule {}
