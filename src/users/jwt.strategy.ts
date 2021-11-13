import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'client-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_USER_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId };
  }
}

const cookieExtractor = function(request: any) {
  if(request?.session?.jwt) {
    return request.session.jwt
  }
}