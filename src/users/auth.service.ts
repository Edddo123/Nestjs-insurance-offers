import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async createClient(client: CreateClientDto) {
    const { email, password } = client;

    return this.usersService.createClient(email, password);
  }
}
