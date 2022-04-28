import { privateMessage } from "../../../entity/privateMessage";
import { InputType , Field , Int} from "type-graphql";
import { User } from "@src/entity/user";
import { SaveOptions, RemoveOptions } from "typeorm";

@InputType()
export class privateMsgInput  {
    
    @Field()
    body!:string

    @Field(()=> Int)
    userId!:number
}