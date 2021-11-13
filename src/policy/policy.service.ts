import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/users/entities/client.entity';
import { Repository } from 'typeorm';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Policy } from './entities/policy.entity';

@Injectable()
export class PolicyService {
  constructor(@InjectRepository(Policy) private repo: Repository<Policy>) {}
  async create(policy: CreatePolicyDto, client: Client) {
    const newPolicy = this.repo.create({
      client,
      dentistCoverage: policy.dentistCoverage,
      duration: policy.duration,
      emergencyCoverage: policy.emergencyCoverage,
      plasticSurgery: policy.plasticSurgery,
    });

    return await this.repo.save(newPolicy);
  }
}
