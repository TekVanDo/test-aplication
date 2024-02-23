import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { createBcryptSaltyHash } from '../helpers/createBcryptSaltyHash';

@Injectable()
export class PasswordService {
  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return createBcryptSaltyHash(password);
  }
}
