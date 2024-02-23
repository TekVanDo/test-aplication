import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { RateLimit } from '../../../common/decorators/rate-limit.decorator';
import { LoginDto, RegisterDto, } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '@test-app/api-interfaces/lib/interfaces/auth';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('')
@Public()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  /** Login to an account */
  @Post('login')
  @RateLimit(10)
  async login(@Body() data: LoginDto): Promise<TokenResponse> {
    return this.authService.loginWithPassword(data.email, data.password);
  }
  // ,
  /** Create a new account */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @RateLimit(10)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pictures[]', maxCount: 10 },
  ]))
  async register(@Body() data: RegisterDto, @UploadedFiles() files: {
    pictures?: Express.Multer.File[]
  }): Promise<TokenResponse> {
    return this.authService.register(data, files['pictures[]']);
  }

  /** Get a new access token using a refresh token */
  @Post('refresh')
  @RateLimit(5)
  async refresh(@Body('token') refreshToken: string): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshToken);
  }
}
