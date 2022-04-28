import "reflect-metadata";
import "dotenv-safe/config";

import express,{Request,Response} from "express";
import session from "express-session";
import   Redis from "ioredis"
import connectRedis from "connect-redis";

/*import  {ApolloServer,GraphQLOptions, } from "apollo-server-express";

import { createServer, useExtendContext } from "@graphql-yoga/node";

import { graphqlYoga ,} from "graphql-yoga";

*/

import {ApolloServer, ApolloServerExpressConfig} from "apollo-server-express"

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginInlineTrace,
  // ApolloServerPluginInlineTrace,P
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
//import http from "http";
import { buildSchema, buildTypeDefsAndResolvers, Subscription } from "type-graphql";

import {  Any, createConnection } from "typeorm";
import path from "path";
import cors from "cors";
import http, { createServer } from "http";
//import { createUserLoader } from "./utils/createUserDataloader";


import { userResolver } from "./resolvers/user/userResolver";
import { profileResolver } from "./resolvers/profileResolver";
import { postResolver } from "./resolvers/post/PostResolver";
import { commentResolver } from "./resolvers/comment/commnetResolver";
import { userProfileResolver } from "./resolvers/user/userProfileResolver";
import  {PrivateMessageQueryResolver} from "./resolvers/pirvateMsg/Query"
//import { confirmedUserResolver } from "./resolvers/confirmedEmail";

//* enetities
import { User } from "./entity/user";
import { Profile } from "./entity/profile";
import { Post } from "./entity/post";
import { Comment } from "./entity/comment";
import { T } from "./resolvers/trail";
//import { keys } from "lodash";
//import { findConfigFile } from "typescript";
//import { Server } from "http";
//import { runInNewContext } from "vm";
import { MyContext } from "./types";
import { COOKIE_NAME } from "./constants";
import { confirmedUserResolver } from "./resolvers/confirmedEmail";
import { privateMessage } from "./entity/privateMessage";
import { PrivateMessageMutationResolver } from "./resolvers/pirvateMsg/privateMessageResolver";

import { initializeRedis } from "./Config/redisConfig";
import { initilizeExpress } from "./Config/initilizeExpress";


import  {  WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
//import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import installSubscriptionHandlers, {
  createClient,
  GRAPHQL_TRANSPORT_WS_PROTOCOL,
  SubscribePayload,
} from "graphql-ws";
import { graphqlUploadExpress } from "graphql-upload";
import { graphqlHTTP } from "express-graphql";


import { execute, getOperationAST, GraphQLError, subscribe, validate } from "graphql";

import { SubscriptionServer, GRAPHQL_WS } from "subscriptions-transport-ws";
import { parse } from "path/posix";
import { makeExecutableSchema } from "@graphql-tools/schema";
import bodyParser from "body-parser";
import { UserMessage } from "./entity/userMessages";
import { Topic } from "./common/topics";

//const PORTJS:number = 4000
export const startSR = async (msg: string) => {
  // TypeORM.useContainer(Container);

  const conn = await createConnection({
    type: "postgres",
    username: "postgres",
    database: "full_stack",
    host: "localhost",
    password: "@@as##9999980",
    port: 5433,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User, Profile, Post, Comment, privateMessage,UserMessage],
    synchronize: true,
    logger: "advanced-console",
    logging: "all",
    // dropSchema: true,
    cache: true,
  });
  if (conn) {
    console.log("database connected");
  } else {
    console.log("something error happen");
  }
  // await c
  console.log(msg);
  

  const { app } = initilizeExpress();
  const httpServer = http.createServer(app);
  const { redisClient, pubSub } = initializeRedis();

  //app.use(express.urlencoded({ extended: true }));
  if (redisClient) {
    console.log("redis connected");
  }
 



  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers(
    {
      resolvers: [
        userResolver,
        postResolver,
        confirmedUserResolver,
        commentResolver,
        userProfileResolver,
        PrivateMessageMutationResolver,
        PrivateMessageQueryResolver,      
      ],
       
      pubSub,
 
    },
  )

  const wsServer = new WebSocketServer({
  
     port:4001,
  
    path: "/graphql",
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  
  const serverCleanup = useServer({ schema }, wsServer);





  
  //app.use("/graphql",server );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
     
    ],

    context: ({ req, res }): MyContext => ({ req, res, redis: redisClient }),
  });

 
   await server.start() 
   
    app.use(graphqlUploadExpress({maxFiles:2}));
     server.applyMiddleware({
      app:app,
    
      cors: { origin: "http://localhost:3000",credentials:true },
    
    path: "/graphql",
    
  });
  

  /* app.use((req: Request, res: Response) => {
    res.send("hi from fuck");
  });*/
  app.listen(process.env.PORTG, () => {
    
         console.log(
      `Server is now running on http://localhost:${process.env.PORTG}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${process.env.PORTG}${server.graphqlPath}`
    );
  });
};;


