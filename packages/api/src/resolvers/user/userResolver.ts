import {ObjectType, Resolver, 
  Query ,Mutation,
  Arg, Field,FieldResolver,
  Ctx ,Root ,UseMiddleware } from "type-graphql";
import { User } from "../../entity/user";
import { UserInput } from "../types/userInput";
import { validateRegister } from "../validation/validateRigster";
import { MyContext } from "../../types";
import {COOKIE_NAME, FORGET_OR_CHANGE_PASSWORD_PREFIX} from '../../constants'

import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import * as bcrypt from "bcryptjs"
import argon2 from "argon2";
import { getConnection } from "typeorm";
import   { v4  } from "uuid";
import { find } from "lodash";
import { isAuth } from "../../middleware/isAuth";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmtionUrl";
import { Post } from "@src/entity/post";

@ObjectType()
class FieldError {
  @Field()
  Field?: string;

  @Field()
  Message?: string;
}


@ObjectType()
class userResponse {
  @Field(() => [FieldError],{nullable:true})
  errors?: FieldError[];

  @Field(() => User, { nullable:true })
  user?: User;
}


@Resolver(User)
export class userResolver {
  /* @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return "";
  }*/

  //* Change PASS
  @Mutation(() => userResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<userResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            Field: "newPassword",
            Message: "length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_OR_CHANGE_PASSWORD_PREFIX + token; //* we use prefixer for diff token , using one token  is so bad
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            Field: "token",
            Message: "token expired",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            Field: "token",
            Message: "user no longer exists",
          },
        ],
      };
    }

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword), //* =>
      }
    );

    await redis.del(key);

    // log in user after change password
    req.session.userId = user.id; //*=>

    return { user };
  }

  //* forget PASS
  @Mutation(() => Boolean)
  async forgetPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();

    await redis.set(
      FORGET_OR_CHANGE_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days

    ///  `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    const url: string = `http://localhost:3000/change-password/${token}`;
    await sendEmail(email, url);
    return true;
  }

  //* Query Uesr Info

  @Query(() => User, { nullable: true })
  //@UseMiddleware(isAuth)
  isLogged(@Ctx() { req }: MyContext) {
    console.log("session:", req.session);
    // you are not logged in
    if (!req.session.id) {
      //* =>
      return null;
    }

    return User.findOne(req.session.userId); //* =>
  }

 

  @Query(() => [User], { nullable: true })
  users(@Ctx() { req }: MyContext): Promise<User[]> {
    console.log("session:", req.session);
    // you are not logged in
    let user = getConnection()
      .createQueryBuilder()
      .select("*")
      .from(User, "user")
      .orderBy("user.userName", "ASC")
      .execute();
    return user; //* =>
  }

  @Mutation(() => userResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req, redis }: MyContext
  ): Promise<userResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password); //* =>
    let user;

    try {
      //user = await User.create({...options}).save()

      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          userName: options.userName, //* => check here
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err: any) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              Field: "userName",
              Message: "username already taken",
            },
          ],
        };
      }
    }
    // this will set a cookie on the user
    // keep them logged in

    req.session.userId = user.id;

    const token = v4();
    await redis.set(token, user.id, "ex", 60 * 60); // 1 h expiration
    const url: string = `http://localhost:3000/user/confirm/${token}`;

    await sendEmail(options.email, url);
    console.log(sendEmail(options.email, url));

    return { user };
  }

  //* => login

  @Mutation(() => userResponse)
  async login(
    @Arg("userNameOrEmail") userNameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<userResponse | null> {
    const user = await User.findOne(
      userNameOrEmail.includes("@")
        ? { where: { email: userNameOrEmail } }
        : { where: { userName: userNameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            Field: "userNameOrEmail",
            Message: "that username doesn't exist {account}",
          },
        ],
      };
    }

    const validPass = await argon2.verify(user.password, password);

    if (!validPass) {
      return {
        errors: [
          {
            Field: "password",
            Message: "incorrect password",
          },
        ],
      };
    }
    if (!user.confirmed) {
      return {
        errors: [
          { Field: "userNameOrEmail", Message: "user name is not confirmed" },
        ],
      };
    }
    // this will set a cookie on the user
    // keep them logged in
    // @ts-ignore
    req.session.userId = user.id; //* check userId or id

    return { user };
  }

  //* => logout

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
};
