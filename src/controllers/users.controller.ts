// ===== IMPORTS =========
import { Controller } from '@nestjs/common';
// ===== SERVICE =========
import { UsersService } from '@services/index';
// ===== ENTITIES =========
import { UserEntity } from '@entities/index';
// ===== CRUD OPERATORS =========
import { Crud } from '@dataui/crud';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
    model: { type: UserEntity }
})

// 2. Define the controller for users
@Controller('users')
export class UsersController {
    // 3. Inject the service for users --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
    constructor(public service: UsersService) { }
}

