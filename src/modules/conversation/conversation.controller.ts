import {
  Controller,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('/:placeId')
  // async getConversation(@Req() req, @Res() res) {
  //   const conversation = this.conversationService.getConversation(
  //     req.user.id,
  //     req.params.placeId,
  //   );
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Booking has been created successfully',
  //   });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('/:placeId')
  // async getConversation(@Req() req, @Res() res) {
  //   const conversation = this.conversationService.getConversation(
  //     req.user.id,
  //     req.params.placeId,
  //   );
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Booking has been created successfully',
  //   });
  // }

  @UseGuards(JwtAuthGuard)
  @Post('/:placeId/messages/send')
  async sendMessage(@Req() req, @Res() res, @Body() body) {
    const conversation = this.conversationService.sendMessage(
      req.user.id,
      req.params.placeId,
      body.message,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Booking has been created successfully',
    });
  }
}
