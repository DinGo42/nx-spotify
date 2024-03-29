declare namespace NodeJS {
  interface ProcessEnv {
    [name: string]: never;
    PORT: number;
    DATABASE_URL: string;
    JWT_REFRESH_SECRET_KEY: string;
    JWT_ACCESS_SECRET_KEY: string;
  }
}
