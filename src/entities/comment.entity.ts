// ====== IMPORTS =========
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
// ====== OTHER ENTITIES =========
import { UserEntity, PostEntity } from '@entities/index';
import { Generic as GenericEntity } from './generic.entity';

// 1. Define an entity for comments
@Entity({ name: 'comments', synchronize: true })
export class Comment extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'int', nullable: false })
  post_id: number;

  // ====== RELATIONS =========
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: UserEntity;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  posts: PostEntity;
}
