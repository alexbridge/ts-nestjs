export class AuthPrincipal {
  private userName: string;
  private roles: string[];

  constructor(userName: string, roles: string[]) {
    this.userName = userName;
    this.roles = roles;
  }
}
