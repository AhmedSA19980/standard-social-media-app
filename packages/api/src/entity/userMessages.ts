import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import {privateMessage} from "./privateMessage";
import {User} from "./user";

@Entity()
@ObjectType()
export class UserMessage {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.privateMessages, { primary: true })
  user!: User;

  @Field(() => privateMessage)
  @ManyToOne(() => privateMessage, (message) => message.userMessages, {
    primary: true,
  })
  message!: privateMessage;

  @Field()
  @Column("bool", { default: false })
  isUnread!: boolean;
}
