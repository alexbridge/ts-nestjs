import { IsNotBlank } from '@modules/common/validation/decorators/custom-validators';
import { registerAs } from '@nestjs/config';
import { IsArray, IsEnum, ValidateNested, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import { AuthPrincipalRoles } from '../../common/principal/auth-principal.roles';

dotenv.config();

export class AuthBasicUser {
  @IsNotBlank()
  userName: string;

  @IsNotBlank()
  password: string;

  @IsArray()
  @IsEnum(AuthPrincipalRoles, { each: true })
  roles: AuthPrincipalRoles[];

  constructor(userName: string, password: string, roles: AuthPrincipalRoles[]) {
    this.userName = userName;
    this.password = password;
    this.roles = roles;
  }
}

export class AuthBasicConfig {
  @IsArray()
  @ValidateNested({ each: true })
  authUsers: AuthBasicUser[];

  constructor(authUsers: AuthBasicUser[]) {
    this.authUsers = authUsers;
  }
}

export const authBasicConfig = registerAs('auth.basic', (): AuthBasicConfig => {
  const config = new AuthBasicConfig([
    new AuthBasicUser(
      process.env.AUTH_BASIC_USER_1_NAME ?? 'username1',
      process.env.AUTH_BASIC_USER_0_PASSWORD ?? 'password1',
      [AuthPrincipalRoles[process.env.AUTH_BASIC_USER_0_ROLE] ?? AuthPrincipalRoles.VIEW],
    ),
    new AuthBasicUser(
      process.env.AUTH_BASIC_USER_1_NAME ?? 'username2',
      process.env.AUTH_BASIC_USER_1_PASSWORD ?? 'password2',
      [AuthPrincipalRoles[process.env.AUTH_BASIC_USER_1_ROLE] ?? AuthPrincipalRoles.MODIFY],
    ),
  ]);

  const errors = validateSync(config);
  if (errors.length) {
    throw new Error(errors.toString());
  }
  return config;
});
