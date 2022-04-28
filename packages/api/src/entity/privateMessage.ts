import { Field, ID, ObjectType,GraphQLISODateTime, Int } from "type-graphql";
import { User } from "./user";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  
  
} from "typeorm";
import { UserMessage } from "./userMessages";


@Entity()
@ObjectType()
export class privateMessage extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  body!: string;

  @Field(() => User)
  @ManyToMany(() => User, { onDelete: "CASCADE" })
  sentBy!: User;

  @Field()
  @Column()
  sentById!: number;

  @Field(() => User)
  @ManyToMany(() => User, {
    cascade: ["insert", "recover", "update", "remove"],
  })
  sentTo!: User;

  @Field(()=> UserMessage)
  @OneToMany(()=>UserMessage , (usermessage)=> usermessage.message)
  userMessages!:UserMessage[]

  @Field()
  @Column()
  sentToId!: number;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}