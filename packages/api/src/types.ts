import { Request, Response ,Express } from "express";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserDataloader";
//import { createUpdootLoader } from "./utils/createUpdootLoader";
import session, {Session} from "express-session";
import { Key } from "readline";
import {createProfileDataLoader} from './dataLoader/createProfileDataloader'
import { createUserDataLoader } from "./dataLoader/createUserDataLoader";


declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}



export type MyContext = {
  req: Request & { session: Session }; //* =>check thisout
  redis: Redis;
  res: Response;
  profileLoader: ReturnType<typeof createProfileDataLoader>;
  userLoader: ReturnType<typeof createUserDataLoader>;

  //userLoader: ReturnType<typeof createUserLoader>;
  //updootLoader: ReturnType<typeof createUpdootLoader>;
};  