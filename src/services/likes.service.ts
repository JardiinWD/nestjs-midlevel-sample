// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { LikeEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
// ====== TYPES / DTOs =========

@Injectable()
export class LikesService extends TypeOrmCrudService<LikeEntity> {
  /** Initializes a new instance of the `UsersService` class.
   * @param {Repository<UserEntity>} likeRepository - The repository for accessing `LikeEntity` objects.
   */
  constructor(
    @InjectRepository(LikeEntity)
    public readonly likeRepository: Repository<LikeEntity>,
  ) {
    // Call the super class constructor with the injected repository for likes
    super(likeRepository);
  }
}
