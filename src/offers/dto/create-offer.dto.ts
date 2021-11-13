import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  policyId: string;

  @IsNumber()
  @Min(1000)
  offeredCoverage: number;

  @IsNumber()
  @Min(100)
  fee: number;
}
