//import pkg from "bcryptjs";
//import { randomUUID } from "crypto";


//* check timestamz , wht is looks like
//* check img type
//* with typegraphql we can combine graph api with typeorm calss


import { ObjectType, Field ,ID} from "type-graphql";
import { BaseEntity,Entity,
Column, PrimaryGeneratedColumn,
BeforeInsert , OneToOne,
ManyToOne, OneToMany, JoinColumn ,JoinTable, RelationId, ManyToMany} from "typeorm";


import * as bcrypt from "bcryptjs";
import {Profile} from "./profile"
import {Post} from "./post"
import {Comment} from './comment'
import { type, userInfo } from "os";
import { privateMessage } from "./privateMessage";
import { last } from "lodash";

@Entity() // => specify table name
@ObjectType() // =>  object type for graph ql
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column("varchar", { length: 225, unique: true })
  userName!: string;

  @Field(() => String)
  @Column("varchar", { length: 225, unique: true })
  email!: string;

  //@Field(() => String) => we don't want to expose the password in graph
  @Column()
  password!: string;

  @Column("boolean", { default: false })
  confirmed!: boolean;

  @Field(() => Boolean)
  @Column("boolean", { default: false })
  forgotPasswordLocked!: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isActive!: boolean;
  static id:
    | {
        [key: string]: any; //import { randomUUID } from "crypto";
      }
    | undefined;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Field(() => Profile)
  @OneToOne(() => Profile, 
  profile => profile.user,
  {cascade:true}) //* => one user only have one porifle
  @JoinColumn({name:"profile_id"})
  Profile!: Profile;

  //* privateMsg

  @Field(() => [privateMessage])
  @ManyToMany(() => privateMessage)
  @JoinTable()
  privateMessages!: privateMessage[];

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author, {
    }) //* a user can have many post
  allUserPosts!: Post[];

  // @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.author, {
    onDelete: "CASCADE",
  }) //* display all comment done by a user
  allUserComments!: Comment[];
}
 