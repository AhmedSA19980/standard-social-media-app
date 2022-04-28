
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
  JoinColumn
  
} from "typeorm";

import {User} from './user'
import { Comment } from "./comment";
import { Like } from "./like";

import { Field, ID, Int, ObjectType ,GraphQLISODateTime}from 'type-graphql'



@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  text!: string;

  @Field()
  @Column()
  field!: string; //* file

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @Field(() => ID)
  @Column({ nullable: true })
  postOwner!: number;

  //@Field(()=> [Like])
  //@OneToMany(() => Like, (like) => like.user)
  /*@OneToMany(() => Like, (Like) => Like.user)
  numOfLikes?: Like[];*/
  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comm) => comm.getpost)
  comments?: Comment[];

  @Field(() => User)
  @ManyToOne(() => User, (post) => post.allUserPosts, {
    cascade:["insert" ,"update" , "remove"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }) //* a user can have many post
  @JoinColumn({ name: "user_id" })
  author!: User;
  @RelationId((post: Post) => post.author)
  postBelongToUser!: number;
}
