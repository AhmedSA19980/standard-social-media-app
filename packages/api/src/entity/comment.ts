
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  PrimaryColumn,

} from "typeorm";

//* entity
import { User } from "./user";
import { Post } from "./post";

import {ObjectType,Field,ID, Int} from "type-graphql"

@Entity()
@ObjectType()
export class Comment extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: true })
  writeAComment!: string;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.comments, 
  { cascade: ["update", "insert", "remove"] })
  getpost!: Post;

  // user

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.allUserComments, 
  { onDelete: "CASCADE" }) //* a user can have multilple comment
  author!: User;

  @Field()
  @Column()
  authorId?: number;

  /* @Field(() => String)
  @Column()
  like!: number;*/
}

