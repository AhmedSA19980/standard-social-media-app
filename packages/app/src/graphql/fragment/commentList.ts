import { gql } from "apollo-boost";

export const COMMENT_LIST = gql`
  fragment CommentList on Comment {
    id
    writeAComment
    authorId
  }
`;
