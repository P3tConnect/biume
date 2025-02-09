import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    console.log(req.headers);
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }

    const refreshToken = authHeader.replace('Bearer', '').trim(); // Retirer "Bearer"

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token missing');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
