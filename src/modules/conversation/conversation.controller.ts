import {
  Controller,
  UseGuards,
  Res,
  HttpStatus,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Put,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { ConversationDTO } from './dto/conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllConversation(@Res() res) {
    const conversations = await this.conversationService.getAllConversation();
    return res.status(HttpStatus.OK).json(conversations);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:conversationID')
  async getConversationById(
    @Res() res,
    @Param('conversationID') conversationID,
  ) {
    const conversation = await this.conversationService.findById(
      conversationID,
    );
    if (!conversation)
      throw new NotFoundException('Conversation does not exist');
    return res.status(HttpStatus.OK).json(conversation);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/place/:placeID')
  async getConversationByPlaceId(@Res() res, @Param('placeID') placeId) {
    const conversation = await this.conversationService.findByPlaceID(placeId);
    if (!conversation)
      throw new NotFoundException(
        'Conversation does not exist with this placeId !',
      );
    return res.status(HttpStatus.OK).json(conversation);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/place/user')
  async getConversationByPlaceAndUser(@Req() req, @Res() res) {
    const conversation = await this.conversationService.findByPlaceAndUser(
      req.body.placeId,
      req.body.userId,
      req.body.ownerId,
    );
    return res.status(HttpStatus.OK).json(conversation);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/user/:userID')
  async getConversationByUserId(@Res() res, @Param('userId') userId) {
    const conversation = await this.conversationService.findByUserID(userId);
    if (!conversation)
      throw new NotFoundException(
        'Any conversations exist with this userId for any sender or owner !',
      );
    return res.status(HttpStatus.OK).json(conversation);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createConversation(
    @Res() res,
    @Body() conversationDTO: ConversationDTO,
  ) {
    const conversation = await this.conversationService.addConversation(
      conversationDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Conversation has been successfully created',
      conversation,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateconversation(
    @Res() res,
    @Query('conversationID') conversationID,
    @Body() conversationDTO: ConversationDTO,
  ) {
    const conversation = await this.conversationService.updateConversation(
      conversationID,
      conversationDTO,
    );
    if (!conversation)
      throw new NotFoundException('Conversation does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Conversation has been successfully updated',
      conversation,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteConversation(
    @Res() res,
    @Query('conversationID') conversationId,
  ) {
    const conversation = await this.conversationService.deleteConversation(
      conversationId,
    );
    if (!conversation)
      throw new NotFoundException('Conversation does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Conversation has been successfully deleted',
      conversation,
    });
  }
}
