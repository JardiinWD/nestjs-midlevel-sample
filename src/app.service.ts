// ======== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
// ======== ENTITIES =========
import {
  UserEntity,
  PostEntity,
  CommentEntity,
  LikeEntity,
  UserFollowerEntity,
} from '@entities/index';
// ======== TYPES =========
import { Roles } from '@entities/user.entity';
import { Seed } from 'seed.class';

@Injectable()
export class AppService extends Seed {
  // Inject the EntityManager in the service
  constructor(entityManager: EntityManager) {
    // Call the super class constructor with the injected EntityManager
    super(entityManager);
    // Invoke the fakeIt method in the super class for UserEntity
    process.env.IS_SEEDING === 'true' ? this.retrieveAndSeedFakeData() : null;
  }

  /** Invoke the seedFakeData method in the super class for All Entities
   * @return {Promise<void>} No return value.
   */
  private async retrieveAndSeedFakeData(): Promise<void> {
    // Invoke the fakeIt method in the super class for UserEntity
    await this.seedFakeData(UserEntity);
    // Invoke the fakeIt method in the super class for PostEntity
    await this.seedFakeData(PostEntity);
    // Invoke the fakeIt method in the super class for CommentEntity
    await this.seedFakeData(CommentEntity);
    // Invoke the fakeIt method in the super class for LikeEntity
    await this.seedFakeData(LikeEntity);
    // Invoke the fakeIt method in the super class for UserFollowerEntity
    await this.seedFakeData(UserFollowerEntity);
  }
}

/* 

Create Data WITHOUT FAKER

  constructor(private readonly entityManager: EntityManager) {
    // Save an object in the database to create a new user 
    this.entityManager.save<UserEntity, Partial<UserEntity>>(UserEntity, [
      {
        about: 'I am a new user 2',
        name: 'New User Name 2',
        role: Roles.user,
        email: 'test2@example.com'
      }
    ])
      .then((user: Array<Partial<UserEntity>>) => console.log(user))
      .catch((err) => console.log(err))
  }

*/
