import { Inject, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../../common/configs/config.interface';
import { RegisterDto } from '../dtos/auth.dto';
import { PasswordService } from './password.service';
import { AccessTokenPayload, TokenResponse } from '@test-app/api-interfaces/lib/interfaces/auth';
import { ClientService } from '../../queries/services/client.service';
import { User } from '../../queries/entities/user';
import { ValidationException } from '../../../common/errors/ValidationException';
import { S3_CLIENT } from '../tokens';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Multer } from 'multer';

type File = Express.Multer.File;
import { randomUUID } from 'crypto';
import { Photo } from '../../queries/entities/photo';
import { Client } from '../../queries/entities/client';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private configService: ConfigService<Config>,
    private logger: Logger,
    private usersService: ClientService,
    private dataSource: DataSource,
    @Inject(S3_CLIENT) private s3Client: S3Client,
  ) {
  }

  async register(payload: RegisterDto, pictures?: Express.Multer.File[]): Promise<TokenResponse> {
    const user = await this.createUser(payload, pictures);
    return this.loginResponse(user);
  }

  private async uploadFile(file: Express.Multer.File) {
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
    ).then((() => {
      return `https://${s3Config.assetsBucketName}.s3.${s3Config.assetsPublicRegion}.amazonaws.com/${imageName}`;
    }));
  }

  async createUser(payload: RegisterDto, photos?: Express.Multer.File[]): Promise<any> {
    const hashedPassword = payload.password ? await this.passwordService.hashPassword(payload.password) : '';
    try {
      const newClient = new Client();
      newClient.password = hashedPassword;
      newClient.lastName = payload.firstName;
      newClient.firstName = payload.lastName;
      newClient.email = payload.email;
      newClient.fullName = payload.firstName + ' ' + payload.lastName;
      newClient.avatar = 'https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg';
      newClient.role = 'client';
      newClient.photos = await Promise.all(photos.map((picture) => this.uploadFile(picture)
        .then((one) => {
          const photo = new Photo();
          photo.url = one;
          return this.dataSource.manager.save(photo);
        })));
      return await this.dataSource.manager.save(newClient);
    } catch (e) {
      this.logger.error({ error: e }, 'Error registering new user');
      throw new Error(e);
    }
  }

  async loginWithPassword(email: string, password: string): Promise<TokenResponse> {
    if (!password) {
      throw new ValidationException('Password is required', 'passwordPassed', 'password');
    }

    const user = await this.usersService.findUserWithPassword({ email },);

    if (!user) {
      throw new ValidationException(`User with this email address doesn't exist`, 'userExists', 'email', {
        email,
      });
    }
    const passwordValid = await this.passwordService.validatePassword(password, user.password);

    if (!passwordValid) {
      throw new ValidationException('Invalid password', 'passwordInvalid', 'password');
    }

    return this.loginResponse(user);
  }

  validateUser(userId: number): Promise<User> {
    return this.usersService.findOne(userId);
  }

  generateTokens(payload: AccessTokenPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
      userId: payload.userId,
    };
  }

  private generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('security.jwt.accessTokenSecret', { infer: true }),
      expiresIn: this.configService.get('security.jwt.accessTokenExpiration', { infer: true }),
    });
  }

  private generateRefreshToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('security.jwt.refreshTokenSecret', { infer: true }),
      expiresIn: this.configService.get('security.jwt.refreshTokenExpiration', { infer: true }),
    });
  }

  async refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('security.jwt.refreshTokenSecret', { infer: true }),
      });

      const user = await this.usersService.findOne(userId);
      return this.loginResponse(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async loginResponse(user: User): Promise<TokenResponse> {
    return this.generateTokens({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
