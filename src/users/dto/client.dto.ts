import { Expose } from 'class-transformer';

export class ClientDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}
