import { Field } from "type-graphql";
import { PostInput } from "../post/inputTypes/postInput";
import { EditPostInput } from "../post/inputTypes/editPostInput";
export const PostValidation = (field: PostInput) => {
  if (field?.text.length <= 2) {
    return [
      {
        Field: "text",
        Message: "text Field can not be less than 2 charchter",
      },
    ];
  }
  if (field.field.length <= 2) {
    return [
      {
        Field: "field",
        Message: "text Field can not be less than 2 charchter",
      },
    ];
  }

 
  

  return null;
};