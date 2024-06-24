// ====== IMPORTS =========
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { UserEntity } from '@entities/index';
// ====== TYPES / DTOs =========

// 1. Define the injectable service for users
@Injectable()
export class UsersService {
    /** Initializes a new instance of the `UsersService` class.
     * @param {Repository<UserEntity>} userRepository - The repository for accessing `UserEntity` objects.
     */
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    // ====== METHODS =========
    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}