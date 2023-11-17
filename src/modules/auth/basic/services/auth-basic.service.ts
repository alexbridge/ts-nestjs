import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthPrincipal } from '../../common/principal/auth-principal';
import { authBasicConfig } from '../config/auth-basic.config';

@Injectable()
export class AuthBasicService {
  constructor(
    @Inject(authBasicConfig.KEY)
    private readonly authBasic: ConfigType<typeof authBasicConfig>,
  ) {}

  async login(userName: string, password: string): Promise<AuthPrincipal> {
    const user = this.authBasic.authUsers.find((user) => user.userName === userName);
    if (user && user.password === password) {
      return new AuthPrincipal(user.userName, user.roles);
    }
    return null;
  }
}
