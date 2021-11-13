import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if(!request.user) {
        throw new UnauthorizedException()
    }
    const { userId } = request.user
    if (userId) {
      const user = await this.usersService.findClientById(userId);
     
      request.currentUser = user; 
    }

    return handler.handle(); 
  }
}
