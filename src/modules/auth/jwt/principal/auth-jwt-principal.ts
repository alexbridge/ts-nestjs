import { AuthPrincipal } from '../../common/principal/auth-principal';

export class AuthJwtPrincipal extends AuthPrincipal {
  private accessToken: string;

  constructor(userName: string, roles: string[], accessToken: string) {
    super(userName, roles);
    this.accessToken = accessToken;
  }
}
