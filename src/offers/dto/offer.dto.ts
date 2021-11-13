import { Expose, Transform } from 'class-transformer';

export class OffersDto {
  @Expose()
  id: string;

  @Expose()
  fee: number;

  @Expose()
  offeredCoverage: number;

  @Expose()
  @Transform(({obj}) => obj.policy.id)
  policyId: string;

  @Expose()
  @Transform(({obj}) => obj.policy.emergencyCoverage)
  policyCoverage: string;

  @Expose()
  @Transform(({obj}) => obj.insurer.name)
  insurerName: string;
}
