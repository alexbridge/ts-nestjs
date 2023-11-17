import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthBasicGuard } from '../../../auth/basic/security/auth-basic.guard';
import { PrincipalRoles } from '../../../auth/common/decorator/auth-principal-roles.decorator';
import { Principal } from '../../../auth/common/decorator/auth-principal.decorator';
import { AuthPrincipal } from '../../../auth/common/principal/auth-principal';
import { AuthPrincipalRoles } from '../../../auth/common/principal/auth-principal.roles';
import { AuthPrincipalRolesGuard } from '../../../auth/common/security/auth-principal-roles.guard';

@UseGuards(AuthBasicGuard, AuthPrincipalRolesGuard)
@Controller('/auth/basic')
export class AuthBasicController {
  @PrincipalRoles(AuthPrincipalRoles.VIEW)
  @Get('view')
  async getView(@Principal() principal: AuthPrincipal): Promise<AuthPrincipal> {
    return principal;
  }

  @PrincipalRoles(AuthPrincipalRoles.MODIFY)
  @Get('modify')
  async getModify(@Principal() principal: AuthPrincipal): Promise<AuthPrincipal> {
    return principal;
  }
}
