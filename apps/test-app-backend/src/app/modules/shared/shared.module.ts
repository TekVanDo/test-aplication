import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../../common/configs/config.interface';
import { User } from '../queries/entities/user';
import { Client } from '../queries/entities/client';
import { Photo } from '../queries/entities/photo';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5, }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => {
        const partialConfig = config.get('database', { infer: true })
        return {
          ...partialConfig,
          type: 'postgres',
          synchronize: true,
          entities: [User, Client, Photo]
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [
    ConfigModule,
    PassportModule,
    JwtModule
  ],
})
export class SharedModule {
}
