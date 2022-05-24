import { EditPostInput } from "../post/inputTypes/editPostInput";


export const validateEPost = (field:EditPostInput)=>{

    
    
    if (!field.postId) {
      return [
        {
          Field: "postId",
          Message: "Post not found!",
        },
      ];
    }


    if (!field.field?.length) {
      return [
        {
          Field: "text",
          Message: "Post not found!",
        },
      ];
    }

   

    return null
} 