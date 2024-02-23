import { scryptSync } from 'crypto';
import { hash } from 'bcrypt';

export async function createBcryptSaltyHash(password): Promise<string> {
  return hash(password, 10);
}

export function generateSecretHash(key: string, salt: string) {
  const buffer = scryptSync(key, salt, 64) as Buffer;
  return buffer.toString('hex');
}
