declare namespace NodeJS {
  interface ProcessEnv {
    [name: string]: unknown;
    PORT: string;
    DATABASE_URL: string;
    JWT_REFRESH_SECRET_KEY: string;
    JWT_ACCESS_SECRET_KEY: string;
  }
}
