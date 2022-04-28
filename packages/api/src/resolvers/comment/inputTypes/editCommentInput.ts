import { Post } from "../../../entity/post";
import { Field, InputType, Int } from "type-graphql";



@InputType()
export class editCommentInput {
  @Field(()=> Int)
  commentId!: number;

  @Field()
  editComment!: string;

  
}