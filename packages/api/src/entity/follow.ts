import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";

import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./user";


@Entity()
@ObjectType()
export class Follow extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field()
  @PrimaryColumn()
  followingUserId!: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followingUserId", referencedColumnName: "id" })
  following!: User;
}