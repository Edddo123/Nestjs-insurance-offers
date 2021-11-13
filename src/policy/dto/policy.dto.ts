import { Expose, Transform } from 'class-transformer';

export class PolicyDto {
  @Expose()
  id: string;

  @Expose()
  emergencyCoverage: number;

  @Expose()
  plasticSurgery: number;

  @Expose()
  dentistCoverage: number;

  @Expose()
  duration: number;

  @Expose()
  @Transform(({obj}) => obj.client.id)
  clientId: string;

  @Expose()
  @Transform(({obj}) => obj.client.email)
  clientEmail: string;
}
