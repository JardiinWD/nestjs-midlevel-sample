// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
// ====== REPOSITORIES =========
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { UserFollowerEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
// ====== TYPES / DTOs =========

@Injectable()
export class UserFollowersService extends TypeOrmCrudService<UserFollowerEntity> {
  /** Initializes a new instance of the `UserFollowersService` class.
   * @param {Repository<UserFollowerEntity>} userFollowerRepository - The repository for accessing `UserFollowerEntity` objects.
   */
  constructor(
    @InjectRepository(UserFollowerEntity)
    public readonly userFollowerRepository: Repository<UserFollowerEntity>,
  ) {
    // Call the super class constructor with the injected repository for comments
    super(userFollowerRepository);
  }
}
