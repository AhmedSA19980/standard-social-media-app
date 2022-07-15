import { gql } from "apollo-boost";
import { COMMENT_LIST } from "../fragment/commentList";
import { POSTS_LIST } from "../fragment/postDetail";
export const POSTS = gql`
  query PostsList {
   
     posts{
      ...PostsList
     }
  }
`;
