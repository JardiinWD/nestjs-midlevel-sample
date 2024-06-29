// ===== IMPORTS =========
import { Controller } from '@nestjs/common';
// ===== SERVICE =========
import { LikesService } from '@services/index';
// ===== ENTITIES =========
import { LikeEntity } from '@entities/index';
// ===== CRUD OPERATORS =========
import { Crud } from '@dataui/crud';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
    model: { type: LikeEntity }
})


@Controller('likes')
export class LikesController {
    // 3. Inject the service for likes --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
    constructor(public service: LikesService) { }
}
