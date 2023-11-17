import { Module } from '@nestjs/common';
import { ApiAuthModule } from './modules/api/auth/auth.module';

@Module({
  imports: [ApiAuthModule],
})
export class AppModule {}
