// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
// ====== OTHER ENTITIES =========
import { Generic as GenericEntity } from "./generic.entity";
import { UserEntity } from "@entities/index";

// 2. Define an enum for status of user followers
enum Status {
    blocked = "blocked",
    accepted = "accepted",
    pending = "pending"
}

// 1. Define an entity for user followers
@Entity({ name: "user_followers", synchronize: true })
export class UserFollower extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @Column({ type: "enum", enum: Status, default: Status.pending })
    status: Status; // User's status in the relation

    // ====== RELATIONS =========
    @ManyToOne(
        () => UserEntity, // --> User Entity
        (user: UserEntity) => user.followers, // --> Set the foreign key relation
    )
    @JoinColumn({ name: "followers_id" })
    followers: UserEntity[];

    @ManyToOne(
        () => UserEntity, // --> User Entity
        (user: UserEntity) => user.following, // --> Set the foreign key relation 
    )
    @JoinColumn({ name: "following_id" })
    following: UserEntity[];
}