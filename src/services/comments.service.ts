// ====== IMPORTS =========
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// ====== REPOSITORIES =========
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { CommentEntity } from '@entities/index';
// ====== TYPES / DTOs =========



@Injectable()
export class CommentsService {
    /** Initializes a new instance of the `CommentsService` class.
     * @param {Repository<CommentEntity>} commentRepository - The repository for accessing `CommentEntity` objects.
     */
    constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) { }

    // ====== METHODS =========
}
