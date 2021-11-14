import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PolicyModule } from '../policy/policy.module';
import { Repository } from 'typeorm';
import { Policy } from '../policy/entities/policy.entity';
import { PolicyService } from '../policy/policy.service';
import { Offers } from './entities/offers.entity';
import { OffersService } from './offers.service';
import { ConfigModule } from '@nestjs/config';
import { CreateOfferDto } from './dto/create-offer.dto';

describe('OffersService', () => {
  let service: OffersService;
  let fakePolicyService: Partial<PolicyService>;
  let repositoryMock: Partial<Repository<Offers>>;
  // let fakeRepo: Partial<Repository<Offers>>

  // @ts-ignore
  const repositoryMockFactory: () => MockType<Repository<Offers>> = jest.fn(
    () => ({
      // findOne: jest.fn((entity) => entity),
      create: jest.fn((offer: any, insurer: string) => {
        return {
          insurerId: offer.insurerId,
          offeredCoverage: offer.offeredCoverage,
          policyId: offer.policyId,
          fee: offer.fee,
        };
      }),
      save: jest.fn((newOffer: Offers) => {
        return Promise.resolve({
          insurerId: newOffer.insurerId,
          offeredCoverage: newOffer.offeredCoverage,
          policyId: newOffer.policyId,
          fee: newOffer.fee,
        });
      }),
      // ...
    }),
  );
  process.env.JWT_USER_SECRET = 'asdads';
  process.env.JWT_INSURER_SECRET = 'dasdsa';
  beforeEach(async () => {
    fakePolicyService = {
      findByClient: (clientId: string) => {
        return Promise.resolve([
          {
            id: 'ads',
            emergencyCoverage: 100000,
            plasticSurgery: 20000,
            dentistCoverage: 15000,
            duration: 3,
          } as Policy,
        ]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OffersService,
        { provide: PolicyService, useValue: fakePolicyService },
        {
          provide: getRepositoryToken(Offers),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
    repositoryMock = module.get(getRepositoryToken(Offers));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates an offer with valid arguments', async () => {
    const createdOffer = await service.create(
      { fee: 12222, offeredCoverage: 12312313, policyId: '12313' },

      'asda',
    );
    expect(createdOffer).toBeDefined();
    expect(createdOffer.insurerId).toBe('asda');
    expect(repositoryMock.create).toHaveBeenCalledWith({
      fee: 12222,
      offeredCoverage: 12312313,
      policyId: '12313',
      insurerId: 'asda',
    });
    expect(repositoryMock.save).toHaveBeenCalledWith({
      fee: 12222,
      offeredCoverage: 12312313,
      policyId: '12313',
      insurerId: 'asda',
    });
  });
});
