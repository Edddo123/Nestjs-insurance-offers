import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-client.dto';
import { Client } from './entities/client.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { SerializeInterceptor } from './interceptors/serialize-user.interceptor';

@Controller('users')
@UseInterceptors(new SerializeInterceptor(ClientDto))
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/client')
  async createClient(@Body() body: CreateClientDto) {
    return await this.authService.createClient(body);
  }

  @Post('/client/login')
  async loginClient(@Body() body: LoginClientDto, @Session() session: any) {
    const { token, user } = await this.authService.loginClient(body);
    session.jwt = token;
    return user;
  }

  @Post('/client/logout')
  async logoutClient(@Session() session: any) {
    session.jwt = null;
    return;
  }

  @Get('/client')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  async getClient(@CurrentUser() user: Client) {
    return user;
  }
}
