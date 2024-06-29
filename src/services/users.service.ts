// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { UserEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
// ====== TYPES / DTOs =========

// 1. Define the injectable service for users
@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
    /** Initializes a new instance of the `UsersService` class.
     * @param {Repository<UserEntity>} userRepository - The repository for accessing `UserEntity` objects.
     */
    constructor(@InjectRepository(UserEntity) public readonly userRepository: Repository<UserEntity>) {
        // Call the super class constructor with the injected repository for users
        super(userRepository);
    }
}