import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.RT_SECRET,
      passReqToCallback: true,
    });
  }
  validate(req: FastifyRequest, payload: any) {
    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
