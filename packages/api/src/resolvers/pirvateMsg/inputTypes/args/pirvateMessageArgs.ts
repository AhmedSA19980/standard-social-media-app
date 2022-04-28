import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export  class PrivateMessageArgs {
  @Field(() => ID)
  userId!: number;
}
