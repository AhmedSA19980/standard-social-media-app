import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
  mutation AddComment($writeAComment: String!, $postId: ID!){
    createComment(option: { writeAComment: $writeAComment, postId: $postId }) {
     getpost{
     postBelongToUser,
     field,
     text,
    createdAt
    updatedAt
     comments{
         authorId,
         writeAComment,
          
         }
    }
  }
  }
`;
