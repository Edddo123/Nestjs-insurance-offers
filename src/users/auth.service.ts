import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async createClient(client: CreateClientDto) {
    const { email, password } = client;

    const existingClient = await this.usersService.findClientsByEmail(email);
    if (existingClient.length) {
      throw new BadRequestException('Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.usersService.createClient(email, hashedPassword);
  }
}
