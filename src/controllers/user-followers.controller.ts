// ===== IMPORTS =========
import { Controller } from '@nestjs/common';
// ===== SERVICE =========
import { UserFollowersService } from '@services/index';
// ===== ENTITIES =========
import { UserFollowerEntity } from '@entities/index';
// ===== CRUD OPERATORS =========
import { Crud } from '@dataui/crud';

@Crud({
    model: { type: UserFollowerEntity }
})

@Controller('user-followers')
export class UserFollowersController {
    // 3. Inject the service for comments --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
    constructor(public service: UserFollowersService) { }
}
