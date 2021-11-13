import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Insurer } from './entities/insurer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Client) private repo: Repository<Client>,
    @InjectRepository(Insurer) private insureRepo: Repository<Insurer>,
  ) {}
  async createClient(email: string, password: string) {
    const client = this.repo.create({ email, password });

    return await this.repo.save(client);
  }

  async createInsurer(name: string, password: string) {
    const insurer = this.insureRepo.create({ name, password });

    return await this.insureRepo.save(insurer);
  }

  async findClientByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }
  async findClientById(id: string) {
    return await this.repo.findOne(id);
  }

  async findInsurerByName(name: string) {
    return await this.insureRepo.findOne({ name });
  }

  async findInsurerById(id: string) {
    return await this.insureRepo.findOne(id);
  }
}
