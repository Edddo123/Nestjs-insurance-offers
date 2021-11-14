import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Client } from '../users/entities/client.entity';
import { CurrentUserInterceptor } from '../users/interceptors/current-user.interceptor';
import { SerializeInterceptor } from '../users/interceptors/serialize-user.interceptor';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { GetPoliciesDto } from './dto/get-policies.dto';
import { PolicyDto } from './dto/policy.dto';
import { PolicyService } from './policy.service';

@Controller('policy')
@UseInterceptors(new SerializeInterceptor(PolicyDto))
export class PolicyController {
  constructor(private policyService: PolicyService) {}

  @Get()
  async listPolicies(@Query() params: GetPoliciesDto) {
    return await this.policyService.findAll(params.limit, params.page);
  }

  @Get('/client')
  @UseGuards(JwtAuthGuard)
  async listClientPolicies(@Request() request: any) {
    return await this.policyService.findByClient(request.user.userId)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CurrentUserInterceptor) // it has dependency on Users Service, so we have to import users service from user module
  async createPolicy(
    @Body() policy: CreatePolicyDto,
    @CurrentUser() client: Client,
  ) {
    return await this.policyService.create(policy, client);
  }
}
