import { MiddlewareFn } from "type-graphql";
import { MyContext } from "@src/types";


export const isAuth: MiddlewareFn<MyContext> = ({ context, info }, next) => {
    if (!context.req.session.userId) {
          throw new Error("not authenticated");
    }

    return next()

};
