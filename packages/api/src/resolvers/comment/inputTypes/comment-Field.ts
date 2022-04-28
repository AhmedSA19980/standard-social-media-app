import { Field , ObjectType } from "type-graphql";
import { Post } from "../../../entity/post";
import { User } from "../../../entity/user";
import { Comment } from "../../../entity/comment";

@ObjectType()
export class commentPayload {
  @Field(() => Post, { nullable: true })
  post!: Post;

  @Field(() => User, { nullable: true })
  user!: User;

  @Field()
  comment!: string;

  /*@Field(()=> Comment,{nullable:true})
  theComment!:Comment
  */
}