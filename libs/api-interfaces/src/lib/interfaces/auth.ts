export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

export interface AccessTokenPayload {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
}
