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
import { JwtAuthGuard } from '../guards/auth.guard';
import { InsurerJwtAuthGuard } from '../guards/insurer.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { InsurerDto } from './dto/insurer.dto';
import { LoginClientDto } from './dto/login-client.dto';
import { LoginInsurerDto } from './dto/login-insurer.dto';
import { Client } from './entities/client.entity';
import { Insurer } from './entities/insurer.entity';
import { CurrentInsurerInterceptor } from './interceptors/current-insurer.interceptor';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { SerializeInterceptor } from './interceptors/serialize-user.interceptor';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/client')
  @UseInterceptors(new SerializeInterceptor(ClientDto))
  async createClient(@Body() body: CreateClientDto) {
    return await this.authService.createClient(body);
  }

  @Post('/insurer')
  @UseInterceptors(new SerializeInterceptor(InsurerDto))
  async createInsurer(@Body() body: CreateInsurerDto) {
    return await this.authService.createInsurer(body);
  }

  @Post('/insurer/login')
  @UseInterceptors(new SerializeInterceptor(InsurerDto))
  async loginInsurer(@Body() body: LoginInsurerDto, @Session() session: any) {
    const { token, user } = await this.authService.loginInsurer(body);
    session.jwt = token;
    return user;
  }

  @Get('/insurer')
  @UseGuards(InsurerJwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor(InsurerDto))
  @UseInterceptors(CurrentInsurerInterceptor)
  async getInsurer(@CurrentUser() user: Insurer) {
    return user;
  }

  @Post('/client/login')
  @UseInterceptors(new SerializeInterceptor(ClientDto))
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
  @UseInterceptors(new SerializeInterceptor(ClientDto))
  @UseInterceptors(CurrentUserInterceptor)
  async getClient(@CurrentUser() user: Client) {
    return user;
  }
}
