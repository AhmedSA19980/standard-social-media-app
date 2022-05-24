import DataLoader from "dataloader";
import { keys } from "lodash";
import { In } from "typeorm";

import { Comment } from "../entity/comment";

export const createCommentLoader = () =>
   new DataLoader<number , Comment[]>
   (async function (postIds){

     const comments = await Comment.find({
       where: { postId: In(postIds as number[]) },
       order: { createdAt: "DESC" },
     });

     const commentsForPost: Record<number, Comment[]> = {};

     comments.forEach((c) => {
       commentsForPost[c.postId] = (commentsForPost[c.postId] || []).concat(c);
     });

     return postIds.map((id) => commentsForPost[id] || []);
   });


 
