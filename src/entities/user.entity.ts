// ====== IMPORTS =========
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
// ====== ENTITIES =========
import { PostEntity, CommentEntity, LikeEntity, UserFollowerEntity } from "@entities/index";
import { Generic as GenericEntity } from "./generic.entity";


export enum Roles {
    admin = "admin",
    user = "user"
}

// 1. Define an entity for users 
@Entity({ name: "users", synchronize: true })
export class User extends GenericEntity {
    @PrimaryGeneratedColumn()/*  */
    id: number; // Primary Key

    @Column({ length: 50, unique: true, nullable: false })
    name: string; // User's name

    @Column({ type: "text", nullable: true })
    about: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.user })
    role: Roles;

    // ====== RELATIONS =========
    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[] // --> One user has many posts

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.users)
    comments: CommentEntity[] // --> One user has many comments

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.users)
    likes: LikeEntity[] // --> One user has many likes

    @OneToMany(() => UserFollowerEntity, (UserFollower: UserFollowerEntity) => UserFollower.followers)
    followers: UserFollowerEntity[] // --> One user has many followers

    @OneToMany(() => UserFollowerEntity, (UserFollower: UserFollowerEntity) => UserFollower.following)
    following: UserFollowerEntity[] // --> One user has many followers

}