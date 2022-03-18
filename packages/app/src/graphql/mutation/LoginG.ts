import { gql } from "apollo-boost";



export const LoginGraph = gql`
  mutation Login($userNameOrEmail: String!, $password: String!) {
    login(userNameOrEmail: $userNameOrEmail, password: $password) {
      errors {
        Field
        Message
      }
      user {
        ...basedUserInfo
      }
    }
  }
`;