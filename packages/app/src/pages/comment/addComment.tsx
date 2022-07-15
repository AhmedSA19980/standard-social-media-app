import React from "react";
import { AddCommentToPost } from "../../components/comment/createComment";

 const AddCommentPage = ()=>{
    return (
      <>
        <AddCommentToPost post={{
          __typename: undefined,
          id: "",
          postOwner: "",
          field: "",
          text: "",
          userLike: false,
          likeCount: 0,
          commentCount: 0,
          createdAt: undefined,
          updatedAt: undefined,
          comments: undefined,
          author: {
            __typename: undefined,
            id: "",
            userName: "",
            email: ""
          }
        }}></AddCommentToPost>
      </>
    );
}

export default AddCommentPage