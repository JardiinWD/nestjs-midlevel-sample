// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
// ====== REPOSITORIES =========
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { CommentEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
// ====== TYPES / DTOs =========



@Injectable()
export class CommentsService extends TypeOrmCrudService<CommentEntity> {
    /** Initializes a new instance of the `CommentsService` class.
     * @param {Repository<CommentEntity>} commentRepository - The repository for accessing `CommentEntity` objects.
     */
    constructor(@InjectRepository(CommentEntity) public readonly commentRepository: Repository<CommentEntity>) {
        // Call the super class constructor with the injected repository for comments
        super(commentRepository);
    }
}
