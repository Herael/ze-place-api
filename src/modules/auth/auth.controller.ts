import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Request() req) {
    return this.authService.getUser(req.user);
  }
}
