import { gql } from "apollo-boost";
import { basedUserInfo } from "../fragment/BasedUserInfo";


export  const isActive = gql`
  query me {
    me {
      ...basedUserInfo
    }
  }
`; 