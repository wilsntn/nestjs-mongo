import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('me')
  currentUser(@Req() req: any) {
    const user = req.user;
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @IsPublic()
  @Get('/ativar/:cod')
  activate(@Param('cod') cod: string) {
    return this.usersService.activateEmail(cod);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
