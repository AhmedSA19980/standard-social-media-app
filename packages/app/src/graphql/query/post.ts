import { gql } from "apollo-boost";

export const post = gql`
  query Post($id: Float!) {
    post(postId: $id) {
      id
      text
      field
      postBelongToUser
      createdAt
      comments {
        id
        writeAComment
        authorId
      }
    }
  }
`;
