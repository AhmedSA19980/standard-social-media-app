/*import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  RelationId,
  BaseEntity,
  JoinColumn,
  EntitySchema,
} from "typeorm";*/
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ObjectType, Field,Int, GraphQLISODateTime, ID  } from "type-graphql";


import { User } from "./user";
import { Post } from "./post";




@Entity()
@ObjectType()
export class Like extends BaseEntity {
  @Field(()=> ID)
  @PrimaryGeneratedColumn()
  id!: number;

 // @Field()
  @Column()
  postId!: number;

 // @Field()
  @Column()
  userId!: number;
  //* a user can have one like for each post
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;

  //  userId!: number;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post!: Post;

  /*@Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: "timestamp" })
  date!: Date;
  */
}