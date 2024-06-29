// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { PostEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

// ====== TYPES / DTOs =========

// 1. Define the injectable service for Posts
@Injectable()
export class PostsService extends TypeOrmCrudService<PostEntity> {

    /** Initializes a new instance of the `PostsService` class.
     * @param {Repository<PostEntity>} postRepository - The repository for accessing `PostEntity` objects.
     */
    constructor(@InjectRepository(PostEntity) public readonly postRepository: Repository<PostEntity>) {
        // Call the super class constructor with the injected repository for posts
        super(postRepository);
    }

    // ====== METHODS =========
}