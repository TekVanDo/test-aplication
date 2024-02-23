import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configs/config';
import { SharedModule } from './modules/shared/shared.module';
import { validateConfig } from './common/helpers/validate-config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './common/errors/validationExceptionFilter';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ]
})
export class AppModule {}
