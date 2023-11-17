import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPrincipal } from '../../common/principal/auth-principal';
import { AuthJwtConfig, authJwtConfig } from '../config/auth-jwt.config';
import { AuthJwtService } from '../services/auth-jwt.service';

dotenv.config();

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authJwtConfig.KEY)
    private readonly authJwt: AuthJwtConfig,
    private userService: AuthJwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authJwt.secret,
    });
  }

  async validate(payload: any): Promise<AuthPrincipal> {
    return new AuthPrincipal(payload.sub, payload.roles);
  }
}
