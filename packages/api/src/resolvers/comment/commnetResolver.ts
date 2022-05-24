import { Profile } from "../../entity/profile";
import { Resolver, Query,
   ObjectType, Field 
   ,PubSub, Publisher, Subscription, Root, Args, FieldResolver, UseMiddleware } from "type-graphql";
import { Mutation ,Arg ,Ctx ,Int  } from "type-graphql";
import { AddCommentInput } from "./inputTypes/AddcommentInput";
import { MyContext } from "@src/types";
import { User } from "../../entity/user";
import { Post } from "../../entity/post";
import { Comment } from "../../entity/comment";
import { getConnection } from "typeorm";
import { write } from "fs";
import { Topic } from "../../common/topics";
import { editCommentInput } from "./inputTypes/editCommentInput";
import { random } from "lodash";
import { NewCommentsArgs } from "./inputTypes/args/common-args";
import { commentPayload } from "./inputTypes/comment-Field";
import {isAuth} from "../../middleware/isAuth"
import { commentValidation } from "../validation/validateComment";
import { FieldError } from "../types/validationFieldType";

interface commentSub {
  commentId:number,
  writeAComment:string,
  post:Post[]
}


@ObjectType()
class commentMutationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];


  @Field(() => Comment, { nullable: true })
  commemt?: Comment;

  @Field(() => Post, { nullable: true })
  getpost?: Post;
}


@Resolver(() => Comment)
export class commentResolver {
  /* @Query(() => Post, { nullable: true })
  async postB(@Arg("postId") postId: number, @Ctx() { req }: MyContext) {
    return await Post.findOne({ where: { id: postId } });
  }*/

  @FieldResolver(() => User)
  user(
    @Root() comment: Comment,
    @Ctx() { req, userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(comment.authorId as number);
  }



  @Query(() => [Comment])
  comments() {
    return Comment.find();
  }

  /*@FieldResolver()
  async commentsB(@Root() post: Post) {
    const comments = await Comment.find({ where: { getpost: post } });
    return comments;
  }*/
  /*@Query(() => Comment, { nullable: true })
  comment(@Arg("postId") postId: number): Promise<Comment | undefined> {
    return Comment.findOne( postId);
  }*/

  //* write comment

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("option") { postId, writeAComment }: AddCommentInput,
    @PubSub(Topic.newComment)
    notifyAboutNewComment: Publisher<commentPayload>,
    @Ctx() { req, commentsLoader }: MyContext
  ): Promise<Comment> {
    const userId = req.session.userId;
    const author = await User.findOne({
      relations: ["allUserComments"],
      where: { id: req.session.userId },
    });
    const getpost = await Post.findOne({
      where: { id: postId },
      relations: ["author", "comments"],
    });

    /* const errors = commentValidation()
    if(errors){
      return {errors}
    }*/

    if (author && getpost) {
      let com = await Comment.create({
        writeAComment,
        getpost: getpost,
        authorId: userId,
        author: author,
      }).save();
      //console.log("new subscription|pending",notifyAboutNewComment({pos}));
      getpost.comments?.push(com);

      const postRepeat = await Post.findOne({
        where: { id: postId },
        select: ["id", "commentCount"],
      });
      if (postRepeat) {
        postRepeat.commentCount += 1;
        await postRepeat.save();
        commentsLoader.clear(postId);
      }
      /*await notifyAboutNewComment({post:com.getpost
      ,user:com.authorId as any,
      comment:com.writeAComment
    }).catch(err=>console.log(err));*/
      return com;
    }

    throw new Error("post not found ");
  }

  //* edit comment
  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async editComment(
    @Arg("option") { commentId, editComment }: editCommentInput,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    // find post
    // find comment
    //const userId = req.session.userId;
    const author = await User.findOne({
      relations: ["allUserComments"],
      where: { id: req.session.userId },
    });

    const post = await Post.findOne({
      relations: ["author", "comments"],
    });
    let comm = await Comment.findOne({
      where: { id: commentId },
      relations: ["author", "getpost"],
    });

    if (author?.id === comm?.authorId && comm) {
      comm.writeAComment = editComment;
      await comm.save();
      return comm;
    }
    throw new Error("You cannot edit this comment");
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("commentId") commentId: number,
    //@Arg("postId") postId: number,
    @Ctx() { req, commentsLoader }: MyContext
  ): Promise<Boolean> {
    const author = await User.findOne({
      relations: ["allUserComments"],
      where: { id: req.session.userId },
    });
    const comment = await Comment.findOne({
      where: { id: commentId },
      relations: ["author", "getpost"],
    });
    const post = await Post.findOne({
      where: { id: 67 },
      select: ["id", "commentCount"],
    });

    if (author?.id == comment?.authorId && comment) {
      await Comment.remove(comment);
      if (post) {
        post.commentCount -= 1;
        await post.save(); // save post after changes ]
        commentsLoader.clear(commentId);
      }
      return true;
    }

    throw new Error("You cannot edit this comment");
  }

  // *** SUBSCRIPTION *** \\

  @Subscription(() => Comment, {
    topics: Topic.newComment,
    filter: ({ payload, args }) => {
      console.log("payload");
      console.log(payload);
      console.log("args");
      console.log(args);
      payload: Comment;
      args: NewCommentsArgs;
      return payload.getpost === args.postId;
    },
  })
  newMessage(
    @Root() newComment: Comment,
    @Args() { postId }: NewCommentsArgs
  ): Comment {
    if (postId && newComment) {
      return newComment;
    }
    throw new Error("erro r mu be ");
  }
}
