import { gql } from "apollo-boost";
import {POSTS_LIST} from "../fragment/postDetail";
import { basedUserInfo } from "../fragment/BasedUserInfo";
export const PostGraph = gql`
  mutation CreatePost($text: String!, $field: String!) {
    CreatePost(field: { text: $text, field: $field }) {
      post {
        field
        text
        createdAt
        updatedAt
      }
      author{
        userName
        email
      }
  
    
        
      
    }
  }
`;