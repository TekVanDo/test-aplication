import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configs/config';
import { SharedModule } from './modules/shared/shared.module';
import { validateConfig } from './common/helpers/validate-config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: () => {
        const config = configuration();
        validateConfig(config);
        return configuration();
      },
    }),
    SharedModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
