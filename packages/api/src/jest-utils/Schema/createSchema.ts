import { buildSchema } from "type-graphql";
import { userResolver } from "../../resolvers/user/userResolver";



export const createSchema = () =>
  buildSchema({
    resolvers: [
      
      userResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
