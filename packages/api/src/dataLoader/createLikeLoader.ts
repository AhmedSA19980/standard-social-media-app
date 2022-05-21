import DataLoader from "dataloader";
import { keys } from "lodash";
import { In } from "typeorm";

import { Like } from "../entity/like";


  

export const createLikeLoader = () =>
  new DataLoader<{ postId: number; userId: number }, boolean>
  (async function (
    keys
  ) {
    const likes = await Like.find({
      where: {
        postId: In(keys.map((key) => key.postId)),
        userId: In(keys.map((key) => key.userId)),
      },
      select: ["postId", "userId"],
    });

    const likeForPost: Record<string, boolean> = {};

    likes.forEach((like) => {
      likeForPost[`${like.postId}|${like.userId}`] = true;
    });

    return keys.map((key) => likeForPost[`${key.postId}|${key.userId}`]);
  });
