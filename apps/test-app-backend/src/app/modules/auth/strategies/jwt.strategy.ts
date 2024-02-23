import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from '../../../common/configs/config.interface';
import { JwtDto } from '../dtos/jwt.dto';
import { AuthService } from '../services/auth.service';
import { User } from '../../queries/entities/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, readonly configService: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('security.jwt.accessTokenSecret', { infer: true }),
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
