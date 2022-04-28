import { User } from "../../../entity/user";
import { Field, InputType } from "type-graphql";




@InputType()
export class UpdateProfileInput {
  

  @Field()
  bio?: string;

  @Field()
  gender?: string;


  /*@Field()
  followers?: number;

  @Field()
  following?: number;
 */

}
