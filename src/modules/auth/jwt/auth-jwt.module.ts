import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { authJwtConfig } from './config/auth-jwt.config';
import { AuthJwtGuard } from './security/auth-jwt.guard';
import { AuthJwtStrategy } from './security/auth-jwt.strategy';
import { AuthJwtConfigService } from './services/auth-jwt-config.service';
import { AuthJwtService } from './services/auth-jwt.service';

@Module({
  imports: [
    ConfigModule.forFeature(authJwtConfig),
    JwtModule.registerAsync({
      imports: [AuthJwtModule],
      useFactory: (jwtConfigService: AuthJwtConfigService): JwtModuleOptions => {
        return {
          secret: jwtConfigService.jwtConfig.secret,
          signOptions: { expiresIn: jwtConfigService.jwtConfig.ttl },
        };
      },
      inject: [AuthJwtConfigService],
    }),
  ],
  providers: [AuthJwtConfigService, AuthJwtGuard, AuthJwtStrategy, AuthJwtService],
  exports: [AuthJwtConfigService, AuthJwtService, AuthJwtGuard],
})
export class AuthJwtModule {}
