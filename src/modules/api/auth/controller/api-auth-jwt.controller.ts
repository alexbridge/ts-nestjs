import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrincipalRoles } from '../../../auth/common/decorator/auth-principal-roles.decorator';
import { Principal } from '../../../auth/common/decorator/auth-principal.decorator';
import { AuthPrincipal } from '../../../auth/common/principal/auth-principal';
import { AuthPrincipalRoles } from '../../../auth/common/principal/auth-principal.roles';
import { AuthPrincipalRolesGuard } from '../../../auth/common/security/auth-principal-roles.guard';
import { AuthJwtGuard } from '../../../auth/jwt/security/auth-jwt.guard';
import { AuthJwtService } from '../../../auth/jwt/services/auth-jwt.service';
import { AuthLogin } from '../dto/api-auth-login';

@Controller('/auth/jwt')
export class AuthJwtController {
  constructor(private readonly authService: AuthJwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() req: AuthLogin): Promise<AuthPrincipal> {
    const user = await this.authService.login(req.userName, req.password);
    if (!user) {
      throw new ForbiddenException();
    }
    return user;
  }

  @PrincipalRoles(AuthPrincipalRoles.VIEW)
  @UseGuards(AuthJwtGuard, AuthPrincipalRolesGuard)
  @Get('/view')
  async view(@Principal() principal: AuthPrincipal): Promise<AuthPrincipal> {
    return principal;
  }

  @PrincipalRoles(AuthPrincipalRoles.MODIFY)
  @UseGuards(AuthJwtGuard, AuthPrincipalRolesGuard)
  @Get('/modify')
  async modify(@Principal() principal: AuthPrincipal): Promise<AuthPrincipal> {
    return principal;
  }
}
