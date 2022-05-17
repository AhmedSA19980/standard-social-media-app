
import { Profile } from "../entity/profile";
import DataLoader from "dataloader";
import { getManager } from "typeorm";
import { User } from "../entity/user";


export const createProfileDataLoader = () =>
  new DataLoader<number, Profile>(async (id) => {
    const profiles = await getManager()
      .createQueryBuilder(Profile, "profile")
      .where("profile.id IN (:...id)", { id })
      .getMany();

    const usernameToProfile: Record<number, Profile> = {};
    profiles.forEach((u) => {
      usernameToProfile[u.id] = u;
    });
    // console.log(usernameToProfile);
    return id.map((id) => usernameToProfile[id]);
  });
