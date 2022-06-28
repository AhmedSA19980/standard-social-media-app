import { User } from "../../entity/user";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { privateMessage } from "../../entity/privateMessage";
import { MyContext } from "../../types";


@Resolver(() => privateMessage)
export  class PrivateMessageQueryResolver {
  @Query(() => privateMessage, { nullable: true })
  async privateMessage(
    @Ctx() { payload }: MyContext
  ): Promise<privateMessage> {
    return await privateMessage.findOneOrFail({where:{
      sentToId: { id: payload!.userId }},
    });
  }


  @FieldResolver(() => privateMessage)
  async sentBy(
    @Root() privateMessage: privateMessage,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    return await User.findOneOrFail({where:{privateMessages: privateMessage.sentById}});
  }

  @FieldResolver(() => User)
  async sentTo(
    @Root() privateMessage: privateMessage,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    return await User.findOneOrFail({
      where: { privateMessages: privateMessage.sentToId },
    });
  }
}