import { Logger, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesModule } from '../queries/queries.module';
import { ConfigService } from '@nestjs/config';
import { S3_CLIENT } from './tokens';
import { Config } from '../../common/configs/config.interface';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [SharedModule, QueriesModule, TypeOrmModule.forFeature([])],
  controllers: [AuthController],
  exports: [],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
    Logger,
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const s3 = configService.get('s3', { infer: true });
        return new S3Client({
          region: s3.assetsPublicRegion,
          credentials: {
            secretAccessKey: s3.keySecret,
            accessKeyId: s3.keyId
          },
        });
      },
    },
  ],
})
export class AuthModule {
}
