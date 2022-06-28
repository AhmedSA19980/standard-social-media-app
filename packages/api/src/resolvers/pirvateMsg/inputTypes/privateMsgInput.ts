import { privateMessage } from "../../../entity/privateMessage";
import { InputType , Field , Int} from "type-graphql";
import { User } from "../../../entity/user";
import { SaveOptions, RemoveOptions } from "typeorm";

@InputType()
export class privateMsgInput  {
    
    @Field()
    body!:string

    @Field()
    recieveUserId!:string

}