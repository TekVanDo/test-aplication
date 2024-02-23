import { Logger, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesModule } from '../queries/queries.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [SharedModule, QueriesModule, TypeOrmModule.forFeature([]), UploadModule],
  controllers: [AuthController],
  exports: [],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
    Logger,

  ],
})
export class AuthModule {
}
