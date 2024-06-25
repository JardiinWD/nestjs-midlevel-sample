// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
// ====== ENTITIES =========
import { UserEntity } from "@entities/index";
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

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.posts,
        { onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "user_id" })
    users: UserEntity;
}