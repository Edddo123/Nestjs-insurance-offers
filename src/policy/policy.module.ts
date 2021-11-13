import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Policy } from './entities/policy.entity';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Policy]), UsersModule],
  controllers: [PolicyController],
  providers: [PolicyService],
  exports: [PolicyService]
})
export class PolicyModule {}
