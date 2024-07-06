// ====== IMPORTS =========
import { InjectRepository } from '@nestjs/typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
// ====== OTHER ENTITIES =========
import {
  CommentEntity,
  LikeEntity,
  UserEntity,
  FileEntity,
} from '@entities/index';
import { Generic as GenericEntity } from './generic.entity';
// ====== VALIDATORS =========
import { CrudValidationGroups } from '@dataui/crud';
import { Injectable } from '@nestjs/common';
import { IsUniqueTitle } from '@validators/unique.validators';
import { IsDefined, IsEmpty, IsOptional, IsString } from 'class-validator';
const { CREATE, UPDATE } = CrudValidationGroups;

// Importing the repository type for the Post entity. This is not necessary for the entity to function, but it is useful for typing the repository.
// Without this line, the type of postRepository would be Repository<GenericEntity> instead of Repository<Post>.
let postRepository: Repository<Post>;

// 1. Define an entity for posts
@Entity({ name: 'posts', synchronize: true })
@Injectable()
export class Post extends GenericEntity {
  // 2. Inject the repository for posts into the entity class
  constructor(@InjectRepository(Post) repo: Repository<Post>) {
    // Call the super class constructor with the injected repository for posts
    super();
    // Set the repository for posts
    postRepository = repo;
  }

  // ====== ENTITY KEYS =========

  @PrimaryGeneratedColumn()
  @IsOptional({ always: true }) // --> Validation for ID (Always)
  id: number; // Primary Key

  @Column({ length: 50 }) // --> Validation
  @IsDefined({ groups: [CREATE] }) // --> Validation for Create
  @IsOptional({ groups: [UPDATE] }) // --> Validation for Update
  @IsString({ always: true }) // --> Validation for String
  @IsUniqueTitle({ message: 'Title must be unique', always: true })
  title: string;

  @Column({ type: 'text' })
  @IsDefined({ groups: [CREATE] }) // --> Validation for Create
  @IsOptional({ groups: [UPDATE] }) // --> Validation for Update
  @IsString({ always: true }) // --> Validation for String
  body: string;

  @Column({ default: 0, type: 'int' })
  @IsEmpty({ always: true }) // --> Validation for Empty (Always) --> Set `true` to always set the value to 0
  comments_num: number;

  @Column({ type: 'number', select: false })
  user_id: number;

  // ====== RELATIONS =========
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity; // --> One user has many posts

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.posts)
  comments: CommentEntity[]; // --> One post has many comments

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.posts)
  likes: LikeEntity[]; // --> One post has many likes

  @OneToMany(() => FileEntity, (file: FileEntity) => file.user)
  files: FileEntity[]; // --> One post has many files
}

// Promise that resolves when the postRepository is defined
// Uses an interval to check if the postRepository is defined
export default new Promise<Repository<Post>>(
  (resolve: (postRepository: Repository<Post>) => void) => {
    // Create a new interval that runs infinitely
    const interval = setInterval(() => {
      // Check if the `postRepository` is defined
      if (postRepository) {
        // Call the `resolve` function with the `postRepository` as an argument
        resolve(postRepository);
        // Clear the interval
        clearInterval(interval);
      }
    });
  },
);
