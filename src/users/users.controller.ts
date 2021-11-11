import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { SerializeInterceptor } from './interceptors/serialize-user.interceptor';

@Controller('users')
@UseInterceptors(new SerializeInterceptor(ClientDto))
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/client')
  async createClient(@Body() body: CreateClientDto) {
    return await this.authService.createClient(body);
  }
}
