import { gql } from "apollo-boost";

export const RegisterGraph = gql`
  mutation Register($userName: String!, $password: String!, $email: String!) {
    register(
      options: { userName: $userName, password: $password, email: $email }
    ) {
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
