import { gql } from "apollo-boost";
import {POST_LIST_DETAIL} from "../fragment/postDetail";
import { basedUserInfo } from "../fragment/BasedUserInfo";
export const PostGraph = gql`
  mutation CreatePost($text: String!, $field: String!) {
    CreatePost(field: { text: $text, field: $field }) {
      post {
        field
        text
        postBelongToUser
        createdAt
        updatedAt
      }
    
        
      
    }
  }
`;