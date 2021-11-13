import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class InsurerJwtAuthGuard extends AuthGuard('insurer-jwt') {}
