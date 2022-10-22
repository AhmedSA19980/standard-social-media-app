import { Alert } from "@chakra-ui/react";
import { CommentsQuery, PostQuery } from "../../generated/graphql";
import { comments } from "../../graphql/query/comment/comments";
import { CommentsUser } from "./data";

type value = {
  idValue?: string | null;
};
export const SectionComments = (props: CommentsQuery, { idValue }: value) => {
  const { comments } = props;
  let post: PostQuery;
  const postId = comments.map((c) => c.getpost.id != post?.post?.id);
  if (postId) {
    return (
      <>
        <CommentsUser />
      </>
    );
  }

  return <Alert>Comments not Found</Alert>;
};
