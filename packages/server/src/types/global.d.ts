declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      LOCK_PASS: string;
      NODE_PORT: string;
      DB_FORCE: string;
      NODE_ENV: 'production' | 'development';
    }
  }
}

export {};
