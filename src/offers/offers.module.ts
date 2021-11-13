import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyModule } from 'src/policy/policy.module';
import { Offers } from './entities/offers.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offers]), PolicyModule],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
