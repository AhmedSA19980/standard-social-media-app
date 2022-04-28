import { Request, Response ,Express } from "express";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserDataloader";
//import { createUpdootLoader } from "./utils/createUpdootLoader";
import session, {Session} from "express-session";
import { Key } from "readline";



declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}



export type MyContext = {
  req: Request & {session:Session }; //* =>check thisout
  redis: Redis;
  res: Response;
  //userLoader: ReturnType<typeof createUserLoader>;
  //updootLoader: ReturnType<typeof createUpdootLoader>;
};  