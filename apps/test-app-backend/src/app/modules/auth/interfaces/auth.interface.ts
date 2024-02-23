import type { Request as NestRequest } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';


export interface AccessTokenParsed {
  id: number;
  scopes: string[];
  type: 'user' | 'api-key';
  sessionId?: number;
}


type CombinedRequest = ExpressRequest & typeof NestRequest;
export interface UserRequest extends CombinedRequest {
  user: AccessTokenParsed;
}

export interface GoogleUserInfoResponse {
  /**
   * The user's email address.
   */
  email?: string | null;
  /**
   * The user's last name.
   */
  family_name?: string | null;
  /**
   * The user's gender.
   */
  gender?: string | null;
  /**
   * The user's first name.
   */
  given_name?: string | null;
  /**
   * The hosted domain e.g. example.com if the user is Google apps user.
   */
  hd?: string | null;
  /**
   * The obfuscated ID of the user.
   */
  id?: string | null;
  /**
   * URL of the profile page.
   */
  link?: string | null;
  /**
   * The user's preferred locale.
   */
  locale?: string | null;
  /**
   * The user's full name.
   */
  name?: string | null;
  /**
   * URL of the user's picture image.
   */
  picture?: string | null;
  /**
   * Boolean flag which is true if the email address is verified. Always verified because we only return the user's primary email address.
   */
  verified_email?: boolean | null;
}
