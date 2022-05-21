import { User } from "../../entity/user";
import { MyContext } from "../../types";
import { argv } from "process";
import {
  Arg,
  Ctx,
  Field,
  Float,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { Follow } from "../../entity/follow";

@ObjectType()
class FollowData {
  @Field(() => [User])
  followers!: User[];

  @Field(() => [User])
  followings!: User[];
}


@Resolver()
export class FollowerResolver {

  @Query(()=> FollowData , {nullable:true})
 async getFollows (@Arg("userId") userId:number):Promise<FollowData>{
   const followData = await Follow.find({
    where:[{userId} , {followingUserId:userId}],
    relations:["user" , 'following']
   });
   
   const followers = followData.filter((follow) => 
   follow.followingUserId === userId)
   .map((follow)=> follow.user)

   const followings = followData
      .filter((follow) => follow.userId === userId)
      .map((follow) => follow.following);

    return {followers , followings}


 }




  @Mutation(() => Boolean)
  async toggleFollow(
    @Arg("followingUserId", () => ID) followingUserId: number,
    @Ctx() { req , followLoader}: MyContext
  ): Promise<boolean> {
    try {
      const following = await Follow.findOne({
        where: { userId: req.session.userId, followingUserId },
      });

      if(following){
          await following.remove()
      }else {
          await Follow.create({
          userId: req.session.userId ,
            followingUserId,
          }).save();
      }
      followLoader.clear({
       userId:req.session.userId as number, 
        followingUserId
      }); 
      return true;
    } catch (err) {
        console.log(err) 
        return false
    }
  }
} 
