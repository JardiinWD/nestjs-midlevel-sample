// ====== IMPORTS =========
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
// ====== OTHER ENTITIES =========
import { UserEntity, CommentEntity, LikeEntity } from "@entities/index";
import { Generic as GenericEntity } from "./generic.entity";
// ====== VALIDATORS =========
import { IsOptional, IsDefined, IsString, IsNumber, IsEmpty } from "class-validator";
import { CrudValidationGroups } from '@dataui/crud'
import { Injectable } from "@nestjs/common";
const { CREATE, UPDATE } = CrudValidationGroups;

// 1. Define an entity for posts 
@Entity({ name: "posts", synchronize: true })
@Injectable()
export class Post extends GenericEntity {

    // 2. Inject the repository for posts into the entity class
    constructor(@InjectRepository(Post) postRepository: Repository<Post>) {
        super();
    }


    // ====== ENTITY KEYS =========

    @PrimaryGeneratedColumn()
    @IsOptional({ always: true }) // --> Validation for ID (Always)
    id: number; // Primary Key


    @Column({ length: 50 }) // --> Validation
    @IsDefined({ groups: [CREATE] }) // --> Validation for Create
    @IsOptional({ groups: [UPDATE] }) // --> Validation for Update
    @IsString({ always: true }) // --> Validation for String
    title: string;


    @Column({ type: "text" })
    @IsDefined({ groups: [CREATE] }) // --> Validation for Create
    @IsOptional({ groups: [UPDATE] }) // --> Validation for Update
    @IsString({ always: true }) // --> Validation for String
    body: string;


    @Column({ default: 0, type: "int" })
    @IsEmpty({ always: true }) // --> Validation for Empty (Always) --> Set `true` to always set the value to 0
    comments_num: number;

    @Column({ type: "number", select: false })
    user_id: number

    // ====== RELATIONS =========
    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.posts,
        { onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "user_id" })
    user: UserEntity; // --> One user has many posts

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.posts)
    comments: CommentEntity[] // --> One post has many comments

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.posts)
    likes: LikeEntity[] // --> One post has many likes

}