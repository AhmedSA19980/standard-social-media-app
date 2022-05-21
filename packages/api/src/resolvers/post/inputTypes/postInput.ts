import { InputType ,Field } from "type-graphql";


@InputType()
export class postInput {
  @Field()
  text!: string;

  @Field()
  field!: string;

  /*@Field()
  likes?: number ;
 */
  //* => don't missing file input
}
