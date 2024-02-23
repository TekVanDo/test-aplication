import type { Config } from './config.interface';

const config: Config = {
  appUrl: process.env.APP_URL,
  apiUrl: process.env.API_URL,
  production: process.env.IS_PRODUCTION === 'true',
  database: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    jwt: {
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      refreshTokenExpiration: 604800000, // 7 days
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      accessTokenExpiration: 1800, // 30 minutes
      verificationTokenSecret: process.env.VERIFICATION_TOKEN_SECRET,
      verificationTokenExpiration: 7200, // 2 hours
    },
  },
  s3: {
    keyId: process.env.S3_KEY_ID,
    keySecret: process.env.S3_KEY_SECRET,
    assetsBucketName: process.env.S3_ASSETS_BUCKET,
    assetsPublicRegion: process.env.S3_ASSETS_REGION,
  },
};

export default (): Config => config;
