import { MyContext } from "../../types";
import { argv } from "process";
import {
  Arg,
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { User } from "../../entity/user";
import { Post } from "../../entity/post";
import { Like } from "../../entity/like";
import { createLikeLoader } from "@src/dataLoader/createLikeLoader";



@Resolver()
export class LikeResolver {

    @Mutation(()=> Boolean)
    async toggleLike(@Arg("postId") postId:number,
    @Ctx() {req, likeLoader}: MyContext
    ):Promise<boolean>{
       
        try{
          const post = await Post.findOne({
            relations: ["author"],
            where: { id: postId },
            select:['id',"likeCount"]
          });

          if(!post)return false;

          let like = await Like.findOne({
              where:{postId , userId:req.session.userId},
          });
          if(!like){
              await Like.create({postId , userId:req.session.userId}).save()
              post.likeCount +=1;
          }else {
              await like.remove()
              post.likeCount -=1 ;
          }
          await post.save()
           likeLoader.clear({
               postId:post.id,
               userId:req.session.userId as number
               
           });
           return true;
        }catch(err){
            console.log(err)
            return false;
        }   

    }
}