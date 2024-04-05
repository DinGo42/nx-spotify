declare namespace NodeJS {
  interface ProcessEnv {
    [name: string]: never;
    BUCKET_ACCESS_KEY: string;
    BUCKET_NAME: string;
    BUCKET_REGION: string;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET_KEY: string;
    JWT_ACCESS_TOKEN_MAX_TIME: number;
    JWT_REFRESH_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_MAX_TIME: number;
    PORT: number;
    SECRET_ACCESS_BUCKET_KEY: string;
  }
}
