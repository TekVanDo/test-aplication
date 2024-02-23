import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { S3_CLIENT } from '../auth/tokens';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../common/configs/config.interface';
import { S3Client } from '@aws-sdk/client-s3';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  providers: [
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
    UploadService
  ],
  exports: [
    UploadService
  ],
})
export class UploadModule {
}
