import { gql } from "apollo-boost";
import { basedUserInfo } from "../fragment/BasedUserInfo";
export const USER_PROFILE = gql`
  query UserProfile {
    userProfile {
      id
      bio
      gender
    }
  }
`;
