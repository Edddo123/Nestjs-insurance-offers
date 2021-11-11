import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/client')
  async createClient(@Body() body: CreateClientDto) {
    return await this.authService.createClient(body);
  }
}
