import { SetMetadata } from '@nestjs/common';
import { AuthPrincipalRoles } from '../principal/auth-principal.roles';

export const ROLES_KEY = 'principal.roles';
export const PrincipalRoles = (...roles: AuthPrincipalRoles[]) => SetMetadata(ROLES_KEY, roles);
