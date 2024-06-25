// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// ====== OTHER ENTITIES =========
import { Generic as GenericEntity } from "./generic.entity";
import { UserEntity, PostEntity } from "@entities/index";

// 1. Define an enum for types of likes
enum Type {
    happy = 'happy',
    sad = 'sad',
    angry = 'angry',
    like = 'like',
    love = 'love'
}

@Entity({ name: "likes", synchronize: true })
export class Like extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @Column({ type: "enum", enum: Type, default: Type.like })
    type: Type; // Type of the like (happy, sad, angry, like, love)

    // ====== RELATIONS =========
    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.likes,
        { onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "user_id" })
    users: UserEntity; // --> Many users have many likes

    @ManyToOne(
        () => PostEntity,
        (post: PostEntity) => post.likes,
        { onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "post_id" })
    posts: PostEntity; // --> Many post has many likes

}