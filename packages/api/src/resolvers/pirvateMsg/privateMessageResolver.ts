import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PrintSchemaOptions,
  Publisher,
  PubSub,
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

@Resolver(() => privateMessage)
export class PrivateMessageMutationResolver {
  @Mutation(() => privateMessage)
  async sendPrivateMessage(
    @Arg("data") { body, userId }: privateMsgInput,
    @Ctx() {req} : MyContext ,
    @PubSub(Topic.NewPrivateMessage)  
    notifyAboutNewPrivateMessage:Publisher<privateMessage>
    
  ):Promise<privateMessage |null>{


    const user = await User.findOne({
      where:{id:req.session.userId} ,
       relations:["privateMessages"]
     
    });

 
    const receipent = await User.findOne({
      where: { id:userId }, // userID
      relations: ["privateMessages"],
    });
       
      if(user && receipent && req.session.userId){

       const newMsg = privateMessage.create({
         body,
         sentById:11,
         sentBy:user, 
         sentToId: 1,
         sentTo:receipent 
       })

       user.privateMessages.push(newMsg) 
       receipent.privateMessages.push(newMsg)
       await notifyAboutNewPrivateMessage(newMsg)
       newMsg.save()
       return newMsg 
  
      }else if(!user ){throw new Error("user not found")}
      return null
    }

  // *** SUBSCRIPTION *** \\

  @Subscription(()=> privateMessage, {
   topics:Topic.NewPrivateMessage, 
    filter: ({ payload, args }) => {
      console.log("payload")
       console.log(payload)
      console.log("args")
      console.log(args)
      //sent to
      return args.sentTo === args.userId
    },
  })
  newPirvateMessage(
    @Root() newPirvateMessage:privateMessage,
    @Args() {userId}: PrivateMessageArgs
    ): privateMessage{
      
      return newPirvateMessage
    }
  
}