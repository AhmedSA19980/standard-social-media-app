import {
  ObjectType,
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  FieldResolver,
  Ctx,
  Root,
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Profile } from "../../entity/profile";
import { User } from "../../entity/user";
import { MyContext } from "../../types";
import streamToPromise from "stream-to-promise";
import path, { dirname } from "path"
import sharp from "sharp";
import fs  from "fs/promises";
import  {createWriteStream}  from "fs";

import { finished, Stream } from "stream";
import { isAuth } from "../../middleware/isAuth";

import { UpdateProfileInput } from "./inputTypes/updateUserProfile";
import { profile } from "console";
import { getConnection, getRepository, InitializedRelationError } from "typeorm";
import { FieldError } from "../types/validationFieldType";


@ObjectType()
class profileResponsed {
  @Field(() => [FieldError])
  error?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}



export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}



@Resolver(() => Profile)
export class userProfileResolver {
  /*@FieldResolver(() => Number)
  async profileOwner(@Root() profile: Profile, @Ctx() { req }: MyContext) {
    if (req.session.userId === profile.profileOwner) {
      return profile.gender;
    }
    return;
  }*/
  @FieldResolver(() => Profile)
  async profile(
    @Root() user: User,
    @Ctx() { profileLoader }: MyContext
  ): Promise<Profile> {
    return profileLoader.load(user.id);
  }

  @Query(() => Profile)
  async userProfile(
    @Root() user: Profile,
    // @Arg( "Gender") {gender}: UpdateProfileInput,
    @Ctx() { req , userLoader}: MyContext
  ){
    const profile = await Profile.findOne({
      where: { profileOwner: req.session.userId },
    });
    return profile;
  }

  @FieldResolver()
  async user(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      relations: ["Profile"],
      where: { id: req.session.userId },
    });
    return user;
  }

  //* => add img
  @Mutation(() => Boolean)
  async addPictureProfile(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const userId = req.session.userId;
    const user = await User.findOne({ where: { id: userId } });
    const mimeTypes: string[] = ["image/png", "image/jpeg", "image/gif"];

    //'{"query":"mutation add($pic:Upload!){\n addPictureProfile(profilePicture:$pic)\n}"}'
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(__dirname + "../../uploads"))
        .on("finish", () => resolve(true))
        .on("close", () => resolve(true))
        .on("error", () => reject(false));
    });

    //console.log(a)
    //return true
  }

  @Mutation(() => Profile)
  @UseMiddleware(isAuth)
  async editProfile(
    @Arg("data") { bio, gender }: UpdateProfileInput,
    @Ctx() { req }: MyContext
  ): Promise<profileResponsed> {
    const user = await User.findOne({
      where: { id: req.session.userId },
      relations: ["Profile"],
    });
    let insertProfile;
    const profile = await Profile.findOne({
      relations: ["user"],
      where: { profileOwner: req.session.userId },
    });
    if (!profile) {
      if (user) {
        const profileUser = await Profile.create({
          profileOwner: req.session.userId,
          bio: bio,
          gender: gender,
        }).save();
        console.log(profile, "SUCCESSED");

        return profileUser;
      }
    } else if (user?.id === profile?.profileOwner) {
      insertProfile = await getConnection()
        .createQueryBuilder(Profile, "profile")
        .update(Profile)
        .set({ bio, gender })
        .returning("*")
        .execute();

      return insertProfile.raw[0];
    } else {
      throw new Error("not valid user");
    }

    return { profile, user };
  }

  //https://images.pexels.com/photos/9226520/pexels-photo-9226520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")

  //* => delete profile picture

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProfilePicture(@Ctx() { req }: MyContext): Promise<Boolean> {
    //const userId = req.session.id;
    const user = await User.findOne({ where: { id: 1 } });
    if (user) {
      await fs.unlink(
        path.join(__dirname, `../../uploads/user/${user.id}.png`)
      );
      return true;
    }

    throw new Error("Not authenticated");
  }

  //* update profile picture
}