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


export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}



@Resolver()
export class userProfileResolver {


  @Query(()=> Profile) 
  async userProfile(
  @Ctx() {req} : MyContext
  ){
    const profile = await Profile.findOne({where:{id:req.session.userId}})
    return profile
  }
  //* => add img 
  @Mutation(()=> Boolean)
  async addPictureProfile(
    @Arg("picture", () => GraphQLUpload)
      { createReadStream, filename }: Upload,
    @Ctx() { req }: MyContext
    
  ):Promise<Boolean> {
    const userId = req.session.userId;
    const user = await User.findOne({where:{id:userId}});
    const mimeTypes: string[] = ["image/png", "image/jpeg", "image/gif"];


     
    //'{"query":"mutation add($pic:Upload!){\n addPictureProfile(profilePicture:$pic)\n}"}'
     return new Promise( async (resolve, reject)=>{
       createReadStream()
         .pipe(createWriteStream(__dirname + "../../uploads"))
         .on("finish", () => resolve(true))
         .on("close", () => resolve(true))
         .on("error", () => reject(false));
     })

    
    
     //console.log(a)
    //return true
  }


  @Mutation(()=> Profile)
  @UseMiddleware(isAuth)
   async editProfile(@Arg("data") {
     bio , gender}: UpdateProfileInput
  , @Ctx() {req} :MyContext):Promise<Profile>{
   const user = await User.find({where:{id:req.session.userId}
  ,relations:["Profile"]})
    
  if(user){
   const profile  = await Profile.create({
     bio,
   }).save()

   return profile
  }
    throw new Error("prfile not saved")
  }

   
  
  //https://images.pexels.com/photos/9226520/pexels-photo-9226520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")

  //* => delete profile picture

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProfilePicture(@Ctx() {req}: MyContext): Promise<Boolean> {
        //const userId = req.session.id;
    const user = await User.findOne({where:{id:1}});
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