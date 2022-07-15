import { gql } from "apollo-boost";

export const ADD_COMMENT = gql`
  mutation AddComment($writeAComment: String!, $postId: ID!){
    createComment(option: { writeAComment: $writeAComment, postId: $postId }) {
     getpost{
    
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
