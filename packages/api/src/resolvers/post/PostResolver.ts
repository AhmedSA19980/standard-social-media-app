import { Profile } from "../../entity/profile";
import { Resolver, Query, Mutation,Ctx 
  ,Arg,InputType,Field,ObjectType,
   Int, Args , UseMiddleware ,FieldResolver,Root, GraphQLISODateTime} from "type-graphql";
import { Post } from "../../entity/post";
import { MyContext } from "@src/types";
import { getConnection } from "typeorm";
import { User } from "../../entity/user";
import { isAuth } from "../../middleware/isAuth";
import { Comment } from "../../entity/comment";
import { postInput } from "./inputTypes/postInput";
import EditPostInput from "../types/editPostInput";
import { PostArgs } from "./inputTypes/post-args-types";
//import { commentInput } from "./types/commentInput";





/*@ObjectType()
class AllPosts {
  @Field(() => [Post])
  posts!: Post[];
  @Field()
  hasMore!: boolean;
}*/

@ObjectType()
class PostMutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => User, { nullable: true })
  author?: User;
}




@Resolver(() => Post)
export class postResolver {
  @Query(() => [Post], { nullable: true })
  async posts(
    //@Arg("postId")  postId : number,
    @Ctx() { req, redis }: MyContext
  ): Promise<Post[]> {
    let post: number | Post[] | PromiseLike<Post[]>;
    let user;
    /*post = getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Post, "post")
      .orderBy("post.createdAt", "ASC")
      .execute();*/

    post = await Post.find({
      where: { postOwner: req.session.userId },
      //relations:["author"]
    });

    return post;

    //throw new Error("posts not found")
  }

  //* Q all post by id

  //*Q POST by id

  @Query(() => Post, { nullable: true })
  async post(@Arg("postId") postId: number, @Ctx() { req }: MyContext) {
    return await Post.findOne({
      relations: ["author"],
      where: { id: postId, postOwner: req.session.userId }, //author: req.session.userId
    });
  }

  @FieldResolver()
  async comments(@Root() post: Post) {
    const comments = await Comment.find({ where: { getpost: post } });
    return comments;
  }

  //* ss
  @FieldResolver()
  //* the name of function comes from author col in post database
  async author(@Root() post: Post) {
    const author = await User.findOne(post.author); //* check this out
    return author;
  }

  //* C POST
  @Mutation(() => PostMutationResponse)
  @UseMiddleware(isAuth)
  async CreatePost(
    @Arg("field") field: postInput,
    @Ctx() { req }: MyContext
  ): Promise<PostMutationResponse> {
    const userId = req.session.userId;

    const author = await User.findOne({
      relations: ["allUserPosts"],
      where: { id: userId },
    });


    if (author) {
      const post = Post.create({
        
        ...field,
        //  postBelongToUser: userId,
        postOwner: userId,
        author: author, //* should specify the same name in db
        
      });
   
    
      //author.allUserPosts.push(post)
      post.author.allUserPosts.push(post)
      
      await post.save()
      return { author,post  };
    }
    throw new Error("user not found or not authenticated"); 
  }
  
  //* U POST
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("data") { text, field, postId }: EditPostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
   // const userId = req.session.userId;
    const author = await User.findOne({
      relations: ["allUserPosts"],
      where: { id: req.session.userId },
    });
    const find = await Post.findOne({
      relations: ["author"],
      where: { id: postId, postOwner: req.session.userId },
    });
    let result;

    if (!find) {
      throw new Error("post unpdated duo to privacy violence");
    }
    if(author?.id === find.postOwner){
    result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ text, field }) //and id = :postId, and author = :author
      .where(" id = :id     ", {
        id: postId,
        //id: author.id,
        //author: author?.id,
        postOwner: req.session.userId,
        author,
        //find
      })
      .returning("*")
      .execute();
       return  result.raw[0];
    }
    throw new Error("not the right user")
    // throw new Error("user not found")

    /*const result = await getConnection()
      .createQueryBuilder()
      .update(post)
      .set({
        text,
        field,
        
      })
      .where("id = :id", {postBelongToUser:userId, id: postId,postOnwer:userId })
      .returning("*")
      .execute();

    return result.raw[0];
    */
    // throw new Error("u're not the post's owner");

    //  return null
  }

  //* D POST
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async DeletePost(
    @Arg("id", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
      const author = await User.findOne({
        relations: ["allUserPosts"],
        where: { id: req.session.userId },
      });
      const find = await Post.findOne({
        relations: ["author"],
        where: { id: postId, postOwner: req.session.userId },
      });
     
      if(author?.id !== find?.postOwner){
       throw new Error ("u can't delete this post ")
      }
       await Post.delete({ id: postId, postOwner: req.session.userId });

   // 
    //postBelongToUser: req.session.userId; //
    return true;
  }
}
