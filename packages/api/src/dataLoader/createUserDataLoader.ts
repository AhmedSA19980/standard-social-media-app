import { Profile } from "../entity/profile";
import DataLoader from "dataloader";
import { getManager } from "typeorm";
import { User } from "../entity/user";

export const createUserDataLoader = () =>
  new DataLoader<number, User>(async (id) => {
    const profiles = await getManager()
      .createQueryBuilder(User, "user")
      .where("user.id IN (:...id)", { id })
      .getMany();

    const idToUser: Record<number, User> = {};
    profiles.forEach((u) => {
      idToUser[u.id] = u;
    });
    // console.log(idToUser);
    return id.map((id) => idToUser[id]);
  });
