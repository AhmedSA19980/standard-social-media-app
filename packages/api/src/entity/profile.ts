//var typeorm = require("typeorm");



import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne
} from "typeorm";
import * as bcrypt from "bcryptjs";
import {User} from './user'
import {Field, ID, ObjectType} from 'type-graphql'


@Entity()
@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column("text", {
    default: `/db/user/default`,
  })
  profilePicture!: string; //* => file name

  @Field((type) => String)
  @Column()
  bio?: string;

  @Field()
  @Column("text", { default: "Male" })
  gender?: "Male" | "Female";

 // @Field()
 /* @Column()
  followers?: number;

  //@Field()
  @Column()
  following?: number ;  
  */
  @Field(()=> [User]) 
  @OneToOne(()=> User, user => user.Profile)
  user!:User


} 
