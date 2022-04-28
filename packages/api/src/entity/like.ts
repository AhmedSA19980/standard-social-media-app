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

import { ObjectType, Field,Int  } from "type-graphql";


import { User } from "./user";
import { Post } from "./post";




@Entity()

export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => Int)
  @Column({ type: "int" })
  value!: number;

  @Field(() => User) //* a user can have one like for each post
  @ManyToOne(() => Post )
  user!: User;
  @JoinColumn({ name: "userId" })
  userId!: number;

  @Field()
  @CreateDateColumn()
  date!: Date;
}