import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthCommonModule } from '../common/auth-common.module';
import { authBasicConfig } from './config/auth-basic.config';
import { AuthBasicGuard } from './security/auth-basic.guard';
import { AuthBasicStrategy } from './security/auth-basic.strategy';
import { AuthBasicService } from './services/auth-basic.service';

@Module({
  imports: [ConfigModule.forFeature(authBasicConfig), PassportModule, AuthCommonModule],
  providers: [AuthBasicService, AuthBasicStrategy, AuthBasicGuard],
})
export class AuthBasicModule {}
