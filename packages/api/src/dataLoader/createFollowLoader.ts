import DataLoader from "dataloader";
import { In } from "typeorm";
import { Follow } from "../entity/follow";


export const createFollowLoader = () =>
 new DataLoader<{userId:number;followingUserId:number}, boolean>(
  async (keys) => {
      const follows = await Follow.find({
        where: {
          userId: In(keys.map((key) => key.userId)),
          followingUserId: In(keys.map((key) => key.followingUserId)),
        },
        select: ["followingUserId", "userId"],
      });
     const  userFollowData:Record<string, boolean> = {}

     follows.forEach((f)=> userFollowData[`${f.userId} | ${f.followingUserId} `] = true)

    return keys.map(
      (key) => userFollowData[`${key.userId} | ${key.followingUserId} `]
    );
  } 
 );
 