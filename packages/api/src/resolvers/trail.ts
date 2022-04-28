import { Profile } from "../entity/profile";
import { Resolver, Query } from "type-graphql";
import { Comment } from "../entity/comment";

@Resolver()
export class T {
  @Query(() => String)
  commnets() {
    return 'finally work';
  }
}
