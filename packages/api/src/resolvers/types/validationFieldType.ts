import { Field, ObjectType } from "type-graphql";



@ObjectType()
export class FieldError {
  @Field()
  Field?: string;

  @Field()
  Message?: string;
}
