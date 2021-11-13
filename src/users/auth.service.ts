import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginClientDto } from './dto/login-client.dto';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { LoginInsurerDto } from './dto/login-insurer.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async createClient(client: CreateClientDto) {
    const { email, password } = client;

    const existingClient = await this.usersService.findClientByEmail(email);
    if (existingClient) {
      throw new BadRequestException('Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.usersService.createClient(email, hashedPassword);
  }

  async loginClient(client: LoginClientDto) {
    const { email, password } = client;

    const existingClient = await this.usersService.findClientByEmail(email);
    if (!existingClient) {
      throw new NotFoundException('Client with this email does not exist');
    }

    if (!(await bcrypt.compare(password, existingClient.password))) {
      throw new BadRequestException('Wrong credentials');
    }
    const token = await this.jwtService.signAsync(
      {
        userId: existingClient.id,
      },
      { expiresIn: '1d', secret: process.env.JWT_USER_SECRET },
    );
    return { user: existingClient, token };
  }

  async createInsurer(insurer: CreateInsurerDto) {
    const { name, password } = insurer;

    const existinginsurer = await this.usersService.findInsurerByName(name);
    if (existinginsurer) {
      throw new BadRequestException('Name in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.usersService.createInsurer(name, hashedPassword);
  }

  async loginInsurer(insurer: LoginInsurerDto) {
    const { name, password } = insurer;

    const existingInsurer = await this.usersService.findInsurerByName(name);
    if (!existingInsurer) {
      throw new NotFoundException('Insurer with this name does not exist');
    }

    if (!(await bcrypt.compare(password, existingInsurer.password))) {
      throw new BadRequestException('Wrong credentials');
    }
    const token = await this.jwtService.signAsync(
      {
        userId: existingInsurer.id,
      },
      { expiresIn: '1d', secret: process.env.JWT_INSURER_SECRET },
    );
    return { user: existingInsurer, token };
  }
}
