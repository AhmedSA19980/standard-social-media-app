import { gql } from "apollo-boost";

export const post = gql`
  query Post($id: String!) {
     post(id:$id){
         id
         text
         postBelongToUser
         likes
         
     }
  }
`;
