import { InputType, Field,Int, ID } from "type-graphql";

@InputType()
export class AddCommentInput {
  @Field(() => String)
  writeAComment!: string;

  @Field(()=> ID)
  postId!: number;

  //* => don't missing file input
}
