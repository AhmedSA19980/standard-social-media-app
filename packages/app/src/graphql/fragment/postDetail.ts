import { gql } from "apollo-boost";

export const POSTS_LIST = gql`
  fragment PostsList on Post {
      id
      postOwner
      field
      text
      userLike
      likeCount
      commentCount
      createdAt
      updatedAt
      comments {
        id
        writeAComment
        authorId
        createdAt
        user {
          userName
          email 
        }
      }
      author {
        id
        userName
        email
      }
    
  }
`;
