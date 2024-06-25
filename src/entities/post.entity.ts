// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
// ====== OTHER ENTITIES =========
import { UserEntity, CommentEntity } from "@entities/index";
import { Generic as GenericEntity } from "./generic.entity";

// 1. Define an entity for posts 
@Entity({ name: "posts", synchronize: true })
export class Post extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @Column({ length: 50 })
    title: string;

    @Column({ type: "text" })
    body: string;

    // ====== RELATIONS =========
    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.posts,
        { onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "user_id" })
    users: UserEntity;

    @OneToMany(
        () => CommentEntity,
        (comment: CommentEntity) => comment.posts
    )
    comments: CommentEntity[]
}