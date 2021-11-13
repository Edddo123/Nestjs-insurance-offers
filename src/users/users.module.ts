import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Insurer } from './entities/insurer.entity';
import { InsurerJwtStrategy } from './jwt-insurer.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Insurer]), JwtModule.register({})], // we can customize all settings globally here
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy, InsurerJwtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
