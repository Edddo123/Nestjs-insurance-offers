import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateInsurerDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(4)
  password: string;
}
