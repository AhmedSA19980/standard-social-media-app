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
  readonly id!: number;

  @Field(() => ID)
  @Column( {nullable: true } )
  profileOwner!: number;

  @Field()
  @Column("text", {
    default: `/db/user/default`,
  })
  profilePicture!: string; //* => file name

  @Field((type) => String)
  @Column({ nullable: true })
  bio?: string;

  @Field(() => String)
  @Column({ nullable: true })
  gender?: string;

  // @Field()
  /* @Column()
  followers?: number;

  //@Field()
  @Column()
  following?: number ;  
  */
  @Field(() => User)
  @OneToOne(() => User, (user) => user.Profile)
  user!: User;
} 
