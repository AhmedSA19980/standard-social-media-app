
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn

} from "typeorm";

//* entity
import { User } from "./user";
import { Post } from "./post";

import {ObjectType,Field,ID, Int, GraphQLISODateTime} from "type-graphql"

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({nullable:true})
  postId!: number;

  @Field()
  @Column()
  writeAComment!: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" }) //cascade: ["update", "insert", ]
  getpost!: Post;

  // user

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.allUserComments, {
    onDelete: "CASCADE",
  }) //* a user can have multilple comment
  // @JoinColumn({name:"user_id", referencedColumnName:"postOwne"})
  author!: User;

  @Field()
  @Column()
  authorId?: number;

  /* @Field(() => String)
  @Column()
  like!: number;*/
}

