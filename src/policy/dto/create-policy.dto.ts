import { IsNumber, Min } from 'class-validator';

export class CreatePolicyDto {
  @IsNumber()
  @Min(1000)
  emergencyCoverage: number;

  @IsNumber()
  @Min(1000)
  plasticSurgery: number;

  @IsNumber()
  @Min(1000)
  dentistCoverage: number;

  @IsNumber()
  @Min(1)
  duration: number;
}
