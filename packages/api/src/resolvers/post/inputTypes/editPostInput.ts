import { Field, Float, GraphQLISODateTime, ID, InputType, Int } from "type-graphql"

@InputType()
export  class EditPostInput {
  @Field(() => Int)
  postId?: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => String)
  field?: string;


}
