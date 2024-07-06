// ====== IMPORTS =========
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// ====== OTHER ENTITIES =========
import { PostEntity, UserEntity } from '@entities/index';
import { Generic as GenericEntity } from './generic.entity';
// ====== VALIDATORS =========
import { Injectable } from '@nestjs/common';
import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// 1. Define an entity for Files
@Entity({ name: 'files', synchronize: true })
@Injectable()
export class File extends GenericEntity {
  // ====== ENTITY KEYS =========

  @PrimaryGeneratedColumn()
  @IsOptional({ always: true }) // --> Validation for ID (Always)
  id: number; // Primary Key

  @Column({ length: 50 }) // --> Validation
  @IsString({ always: true }) // --> Validation for String
  @IsEmpty({ always: true, message: 'Original name cannot be empty' }) // --> Validation for Empty (Always)
  original_name: string;

  @Column({ length: 50 }) // --> Validation
  @IsString() // --> Validation for String
  @IsEmpty({ always: true, message: 'Current name cannot be empty' }) // --> Validation for Empty (Always)
  current_name: string;

  @Column({ type: 'int' }) // --> Validation
  @IsNumber({}) // --> Validation for String
  @IsEmpty({ always: true, message: 'Original name cannot be empty' }) // --> Validation for Empty (Always)
  size: number;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'Extention cannot be empty' })
  extention: string;

  // ====== RELATIONS =========

  /* @Column({ type: "number", select: false })
    @IsOptional({ always: true })
    user_id: number */

  /* @Column({ type: "number", select: false })
    @IsOptional({ always: true })
    post_id: number */

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.files, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity; // --> One user has many Files

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.files, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity; // --> One user has many Files
}
