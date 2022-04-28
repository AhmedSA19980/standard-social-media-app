declare module 'dotenv-safe/config'
declare namespace NodeJS {
  
    export interface ProcessEnv {
      NODE_ENV:string;
      DATABASE_URL: string;
      REDIS_URL: string;
      REDIS_PORT:number;
      REDIS_HOST:string;
      PORTG: number;
      PORT:string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
    }
}
