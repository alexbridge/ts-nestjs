import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtConfig, authJwtConfig } from '../config/auth-jwt.config';
import { AuthJwtPrincipal } from '../principal/auth-jwt-principal';

@Injectable()
export class AuthJwtService {
  constructor(
    @Inject(authJwtConfig.KEY)
    private readonly authJwt: AuthJwtConfig,
    private jwtService: JwtService,
  ) {}

  async login(userName: string, password: string): Promise<AuthJwtPrincipal> {
    const user = this.authJwt.authUsers.find((user) => user.userName === userName);
    if (user && user.password === password) {
      const payload = {
        sub: user.userName,
        username: user.userName,
        roles: user.roles,
      };

      return new AuthJwtPrincipal(
        user.userName,
        user.roles,
        await this.jwtService.signAsync(payload),
      );
    }
    return null;
  }
}
