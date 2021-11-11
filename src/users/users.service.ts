import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}
  async createClient(email: string, password: string) {
    const client = this.repo.create({ email, password });

    return await this.repo.save(client);
  }
}
