import { Expose } from 'class-transformer';

export class InsurerDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
