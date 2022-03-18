import { gql } from "apollo-boost";

export const logOutGraph = gql`
   mutation Logout {
     logout
 }
`
