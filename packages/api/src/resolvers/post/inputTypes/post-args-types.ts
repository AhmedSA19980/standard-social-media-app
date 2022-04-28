import { User } from "../../../entity/user";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export  class PostArgs {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  postId?: number;

  @Field(() => String, { nullable: true })
  orderBy?: string;


  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(()=>[User])
  user?:User[]
}
