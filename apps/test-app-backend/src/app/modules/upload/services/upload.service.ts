import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3_CLIENT } from '../../auth/tokens';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../../common/configs/config.interface';

@Injectable()
export class UploadService {
  constructor(
    @Inject(S3_CLIENT) private s3Client: S3Client,
    private configService: ConfigService<Config>,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const imageName = `${randomUUID()}-${file.originalname}`;
    const s3Config = this.configService.get('s3', { infer: true });
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: s3Config.assetsBucketName,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size
      })
    ).then(((data) => {
      console.log(data, 'data');
      console.log('url', `https://${s3Config.assetsBucketName}.s3.${s3Config.assetsPublicRegion}.amazonaws.com/${imageName}`);
      return `https://${s3Config.assetsBucketName}.s3.${s3Config.assetsPublicRegion}.amazonaws.com/${imageName}`;
    }));
  }
}
