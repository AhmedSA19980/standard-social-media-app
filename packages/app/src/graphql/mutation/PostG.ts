import { gql } from "apollo-boost";

export const PostGraph = gql`
  mutation CreatePost($text: postInput! ) {
    CreatePost(text: $text ) {
     text
     postBelongToUser
     likes
    }
  }
`;