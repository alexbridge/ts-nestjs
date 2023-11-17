import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authJwtConfig } from '../config/auth-jwt.config';

@Injectable()
export class AuthJwtConfigService {
  constructor(
    @Inject(authJwtConfig.KEY)
    readonly jwtConfig: ConfigType<typeof authJwtConfig>,
  ) {}
}
