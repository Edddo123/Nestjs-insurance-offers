import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyService } from '../policy/policy.service';
import { In, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offers } from './entities/offers.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offers) private repo: Repository<Offers>,
    private policyService: PolicyService,
  ) {}
  async create(offer: CreateOfferDto, insurer: string) {
    const newOffer = this.repo.create({
      insurerId: insurer,
      offeredCoverage: offer.offeredCoverage,
      policyId: offer.policyId,
      fee: offer.fee,
    });
    return await this.repo.save(newOffer);
  }

  async find(clientId: string) {
    const policies = await this.policyService.findByClient(clientId);
    const policyIds = policies.map((policy) => policy.id);
    return await this.repo.find({
      where: { policyId: In(policyIds) },
      relations: ['insurer', 'policy'],
    });
    // return await this.repo
    //   .createQueryBuilder('offers')
    //   .leftJoinAndSelect('offers.policy', 'policys')
    //   .leftJoinAndSelect('offers.insurer', 'insurermate') 2nd argument is alias which can be referenced later in query builder
    //   .where('"policyId" IN (:...policies)', { policies: policyIds }) u have to wrap column name in quotes if it has uppercase letters coz otherwise during query it gets lowercased and it wont find column
    //   .andWhere('insurermate.name LIKE :name', {name: "ALDAGI4"}) using alias value on linked table
    //   
    //   .getMany();
  }
}
