import { InputType, Field } from "type-graphql";


@InputType()
export class UserInput {
  @Field()
  email!: string;

  @Field()
  userName!: string;

  @Field()
  password!: string;
}
