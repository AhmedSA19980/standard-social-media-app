import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PrintSchemaOptions,
  Publisher,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,

} from "type-graphql";




import { User } from "../../entity/user";
import { privateMessage } from "../../entity/privateMessage";
import { privateMsgInput } from "./inputTypes/privateMsgInput";
import { MyContext } from "@src/types";
import { Topic } from "../../common/topics";
import { PrivateMessageArgs } from "./inputTypes/args/pirvateMessageArgs";
import { isAuth } from "./../../middleware/isAuth";



interface PrivateMsgInfo{
  id:string,
  sentById:string,
  sentToId:string,
  body:string,

}

@Resolver(() => privateMessage)
export class PrivateMessageMutationResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => privateMessage)
  async sendPrivateMessage(
    @Arg("data") { body, recieveUserId }: privateMsgInput,
    @Ctx() {payload, req} : MyContext ,
    @PubSub(Topic.NewPrivateMessage)  
    notifyAboutNewPrivateMessage:Publisher<privateMessage>
    
  ):Promise<privateMessage | null>{


    const user = await User.findOne({
      where: { id: payload?.userId },
      relations: ["privateMessages"],
    });


    const receipent = await User.findOne({
      where: { id: recieveUserId }, // userID
      relations: ["privateMessages"],
    });
       
      if(user && receipent ){

       const newMsg = privateMessage.create({
         body,
         sentById:user.id, 
         //sentBy:user, 
         sentToId: receipent.id,
         sentTo:receipent 
       })

       user.privateMessages.push(newMsg) 
       receipent.privateMessages.push(newMsg)
       await notifyAboutNewPrivateMessage(newMsg)
       newMsg.save()
       return newMsg 
  
      }
      else if(!user ){throw new Error("user not found")}
      return null 
    }

  // *** SUBSCRIPTION *** \\

  @Subscription(()=> privateMessage, {
   topics:Topic.NewPrivateMessage, 
    /*filter: ({ payload, args }) => {
      console.log("payload")
       console.log(payload)
      console.log("args")
      console.log(args)
      //sent to
      return args.sentTo === args.userId
    },*/ //* if filter run the subscription only works in console , not in palygraound
  })
  newPirvateMessage(
    @Root() {sentById,body, sentToId,id}:PrivateMsgInfo,
    @Args() {userId}: PrivateMessageArgs
    ):PrivateMsgInfo{
      
      return { 
        id:id,
        sentById
        ,body,
        sentToId
      }
    }
  
} 