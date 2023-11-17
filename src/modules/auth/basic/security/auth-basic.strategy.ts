import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthPrincipal } from '../../common/principal/auth-principal';
import { AuthBasicService } from '../services/auth-basic.service';

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthBasicService) {
    super();
  }

  async validate(username: string, password: string): Promise<AuthPrincipal> {
    const user = await this.authService.login(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
