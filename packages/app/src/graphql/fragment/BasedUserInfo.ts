import { gql } from "apollo-boost";


export const basedUserInfo = gql`
  fragment basedUserInfo on User {
    id
    userName
    email
  }
`; 