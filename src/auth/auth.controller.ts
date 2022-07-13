import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
    // return 'Realizar login';
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
