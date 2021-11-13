import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPoliciesDto {
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  page?: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  limit?: number;
}
