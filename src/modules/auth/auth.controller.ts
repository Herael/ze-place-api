import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Request() req) {    
    return this.authService.register(req.body);
  }

  @UseInterceptors(FilesInterceptor('Files'))
  @Post('/uploadID')
  async uploadID(@Request() req, @UploadedFiles() files) {
    return this.authService.uploadID(files);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Request() req) {
    return this.authService.getUser(req.user);
  }

  @Get('/runPython')
  async runPyhon() {
    return this.authService.runPython();
  }
}
