import { Body, Controller, Post, UseGuards, Request, Get, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/auth.guard';
import { InsurerJwtAuthGuard } from '../guards/insurer.guard';
import { SerializeInterceptor } from '../users/interceptors/serialize-user.interceptor';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersDto } from './dto/offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
@UseInterceptors(new SerializeInterceptor(OffersDto))
export class OffersController {
  constructor(private offersService: OffersService) {}
  
  @Post()
  @UseGuards(InsurerJwtAuthGuard)
  async createOffer(@Body() body: CreateOfferDto, @Request() request: any) {
    return await this.offersService.create(body, request.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOffersClient(@Request() request: any) {
    return await this.offersService.find(request.user.userId)
  }
}
