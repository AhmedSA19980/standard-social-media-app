import { gql } from "apollo-boost";
import { COMMENT_LIST } from "../fragment/commentList";
export const POSTS_LIST = gql`
  query PostsList {
    posts {
      id
      createdAt
      field
      text
      createdAt
      postBelongToUser
      comments{
        id
        writeAComment
        authorId
      }

    }
  }
`;
