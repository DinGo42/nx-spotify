declare namespace NodeJS {
  interface ProcessEnv {
    [name: string]: never;
    BUCKET_ACCESS_KEY: string;
    BUCKET_NAME: string;
    BUCKET_REGION: string;
    SECRET_ACCESS_BUCKET_KEY: string;
  }
}
