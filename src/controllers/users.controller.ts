// ===== IMPORTS =========
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
// ===== SERVICE =========
import { UsersService } from '@services/index';
// ===== ENTITIES =========
import { UserEntity } from '@entities/index';


// 1. Define the controller for users
@Controller('users')
// 2. Export the controller for users
export class UsersController {
    // 3. Inject the service for users
    constructor(private readonly usersService: UsersService) { }

    // ====== METHODS =========
    @Get()
    @HttpCode(HttpStatus.OK) // --> Set the HTTP status code to 200
    /** Asynchronously retrieves all users.
     * @return {Promise<UserEntity[]>} The list of all users
     */
    async findAll(): Promise<UserEntity[]> {
        return await this.usersService.findAll();
    }

}

