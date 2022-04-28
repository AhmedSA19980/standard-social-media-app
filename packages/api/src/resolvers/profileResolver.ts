import { Profile } from "../entity/profile";
import { Resolver, Query } from "type-graphql";
import { User } from "../entity/user";
;

@Resolver()
export class profileResolver {
  @Query(() => [Profile])
  profiles() {
    return Profile.find();
  }
}
