import { IsNotBlank } from '@modules/common/validation/decorators/custom-validators';
import { registerAs } from '@nestjs/config';
import { IsArray, IsEnum, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { AuthPrincipalRoles } from '../../common/principal/auth-principal.roles';
dotenv.config();

export class AuthJwtUser {
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

export class AuthJwtConfig {
  @IsString()
  @IsNotBlank()
  secret: string;

  @IsNumber()
  @IsPositive()
  ttl: number;

  @IsArray()
  @ValidateNested({ each: true })
  authUsers: AuthJwtUser[];

  constructor(secret: string, ttl: number, authUsers: AuthJwtUser[]) {
    this.secret = secret;
    this.ttl = ttl;
    this.authUsers = authUsers;
  }
}

export const authJwtConfig = registerAs(
  'auth.jwt',
  (): AuthJwtConfig =>
    new AuthJwtConfig(
      process.env.AUTH_JWT_SECRET ?? randomUUID(),
      parseInt(process.env.AUTH_JWT_TTL ?? '3600'),
      [
        new AuthJwtUser(
          process.env.AUTH_JWT_USER_0_NAME ?? 'username1',
          process.env.AUTH_JWT_USER_0_PASSWORD ?? 'password1',
          [AuthPrincipalRoles[process.env.AUTH_JWT_USER_0_ROLE] ?? AuthPrincipalRoles.VIEW],
        ),
        new AuthJwtUser(
          process.env.AUTH_JWT_USER_1_NAME ?? 'username2',
          process.env.AUTH_JWT_USER_1_PASSWORD ?? 'password2',
          [AuthPrincipalRoles[process.env.AUTH_JWT_USER_1_ROLE] ?? AuthPrincipalRoles.MODIFY],
        ),
      ],
    ),
);
