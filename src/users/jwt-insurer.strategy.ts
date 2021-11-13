import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InsurerJwtStrategy extends PassportStrategy(
  Strategy,
  'insurer-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_INSURER_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId };
  }
}

const cookieExtractor = function (request: any) {
  if (request?.session?.jwt) {
    return request.session.jwt;
  }
};
