import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMessage(@Res() res) {
    const messages = await this.messageService.getAllMessage();
    return res.status(HttpStatus.OK).json(messages);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:messageID')
  async getMessageById(@Res() res, @Param('messageID') messageID) {
    const message = await this.messageService.findById(messageID);
    if (!message) throw new NotFoundException('Message does not exist');
    return res.status(HttpStatus.OK).json(message);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:conversationID')
  async getMessageByConversationId(
    @Res() res,
    @Param('conversationId') conversationId,
  ) {
    const message = await this.messageService.findByConversationID(
      conversationId,
    );
    if (!message)
      throw new NotFoundException(
        'Message does not exist with this conversation !',
      );
    return res.status(HttpStatus.OK).json(message);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createMessage(@Res() res, @Body() messageDTO: MessageDTO) {
    const messageAdded = await this.messageService.addMessage(messageDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Message has been successfully created',
      messageAdded,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteMessage(@Res() res, @Query('messageID') messageId) {
    const messageDeleted = await this.messageService.deleteMessage(messageId);
    if (!messageDeleted) throw new NotFoundException('Message does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Message has been successfully deleted',
      messageDeleted,
    });
  }
}
