import { Controller, UseGuards, Post, Res,  Request, HttpStatus, Get } from '@nestjs/common';
import { BugTicketService } from './bug-ticket.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bug-ticket')
export class BugTicketController {
    constructor(private ticketService: BugTicketService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async addBugTicket(
    @Res() res,
    @Request() req
  ) {
    console.log(req.body);
    const result = await this.ticketService.addTicket(req.body);
    console.log(result);

    return res.status(HttpStatus.OK).json({
      data: result,
    });
  }

  @Get()
  async getBugTicket( @Res() res){
    const result = await this.ticketService.getTicket();
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/changeTag')
  async changeTag(
    @Res() res,
    @Request() req
  ) {
    const result = await this.ticketService.changeTag(req.body);

    return res.status(HttpStatus.OK).json({
      data: result,
    });
  }

}
