import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthPrincipal } from '../principal/auth-principal';

export const Principal = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthPrincipal => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
