// node.augmentations.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    ENVIRONMENT_TYPE: string;
  }
}
