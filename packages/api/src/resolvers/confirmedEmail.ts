
import { MyContext } from "@src/types";
import { Resolver , Arg, Ctx ,Mutation} from "type-graphql";
import { User } from "../entity/user";

@Resolver()
export class confirmedUserResolver {
    @Mutation(()=> Boolean)
   async  confirmedUser(@Arg("token") token:string ,@Ctx() {redis} : MyContext ):Promise<boolean> {
       const userId = await redis.get(token)

       if(!userId){
           return false
       }
       await User.update({id:parseInt(userId)}, {confirmed:true})
       await redis.del(token)

       return true
   }    

}