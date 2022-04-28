import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
export  class NewCommentsArgs {
  @Field(() => ID)
  postId!: number;
}
