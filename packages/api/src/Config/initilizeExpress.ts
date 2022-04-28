import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { COOKIE_NAME,} from "../constants";
import {initializeRedis} from "./redisConfig";



export const  initilizeExpress = () =>{
    const {redisClient ,redisStore} = initializeRedis();

     const app = express()
     app.set("trust proxy", 1);
      app.use(
        cors({
          origin: "http://localhost:3000",
          credentials: true,

          // optionsSuccessStatus: 200,
        })
      );  
     console.log(redisClient);

     app.use(
       cors({
         origin: " http://localhost:4000", // process.env.CORS_ORIGIN,
         credentials: true,
       })
     );
     app.use(
       session({
         name: COOKIE_NAME,
         store: new redisStore({
           client: redisClient,
           disableTouch: true,
         }),
         cookie: {
           maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 10 years
           httpOnly: false, //* disable anyone to display cookie from the front-end
           sameSite: "lax", // csrf
           secure: false, //__prod__, // cookie only works in https
           //domain: __prod__ ? ".codeponder.com" : undefined,
         },
         saveUninitialized: false,
         secret: "i will haide in evn", //process.env.SESSION_SECRET,
         resave: false,
       })
     );

   

     return {app}
}