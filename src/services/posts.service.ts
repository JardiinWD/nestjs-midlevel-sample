// ====== IMPORTS =========
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { PostEntity } from '@entities/index';
// ====== TYPES / DTOs =========

// 1. Define the injectable service for Posts
@Injectable()
export class PostsService {

    /** Initializes a new instance of the `PostsService` class.
     * @param {Repository<PostEntity>} postRepository - The repository for accessing `PostEntity` objects.
     */
    constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) { }

    // ====== METHODS =========
}