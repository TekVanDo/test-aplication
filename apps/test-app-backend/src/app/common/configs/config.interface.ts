export interface Config {
  appUrl: string;
  apiUrl: string;
  production: boolean;
  database: DBConfig,
  security: SecurityConfig;
  s3: S3Config;
}

export interface DBConfig {
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
}

export interface S3Config {
  keyId: string;
  keySecret: string;
  assetsBucketName: string;
  assetsPublicRegion: string;
}

export interface JWTConfig {
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
  accessTokenSecret: string;
  accessTokenExpiration: number;
  verificationTokenSecret: string;
  verificationTokenExpiration: number;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  jwt: JWTConfig;
}
