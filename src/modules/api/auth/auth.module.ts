import { Module } from '@nestjs/common';
import { AuthBasicModule } from '../../auth/basic/auth-basic.module';
import { AuthJwtModule } from '../../auth/jwt/auth-jwt.module';
import { AuthBasicController } from './controller/api-auth-basic.controller';
import { AuthJwtController } from './controller/api-auth-jwt.controller';
import { EchoController } from './controller/api-echo.controller';

@Module({
  imports: [AuthBasicModule, AuthJwtModule],
  controllers: [EchoController, AuthBasicController, AuthJwtController],
})
export class ApiAuthModule {}
