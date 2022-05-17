import { User } from "../../../entity/user";
import { Field, InputType } from "type-graphql";
import { registerEnumType } from "type-graphql";

enum Gender {
  Male = "Male",
  Female = "Female"
}


registerEnumType(Gender,{
  name:"Gender"
})


@InputType()
export class UpdateProfileInput {
  

  @Field()
  bio?: string;

  @Field(type =>Gender, {nullable:true})
  gender?: Gender;


  /*@Field()
  followers?: number;

  @Field()
  following?: number;
 */

}
