import { AddCommentInput } from "../comment/inputTypes/AddcommentInput";



export const commentValidation = (field:AddCommentInput) =>{ 

    if(field.writeAComment.length < 1 ){
        return[{
            Field:"writeAcomment",
            Message:"can't submit empty Comment"
        }]
    }

    return null
}