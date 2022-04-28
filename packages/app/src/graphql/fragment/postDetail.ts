import { gql } from "apollo-boost";

export const POST_LIST_DETAIL = gql`
  fragment PostListDetail on Post {
    field
    text
    postBelongToUser
    createdAt
    updatedAt
    
  }
`;
