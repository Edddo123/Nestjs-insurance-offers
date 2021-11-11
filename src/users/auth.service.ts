import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class AuthService {
  async createClient(client: CreateClientDto) {
    return client;
  }
}
