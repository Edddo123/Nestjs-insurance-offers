import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
