// ===== IMPORTS =========
import { Controller } from '@nestjs/common';
// ===== ENTITIES =========
import { PostEntity } from '@entities/index';
// ===== SERVICES =========
import { PostsService } from '@services/index';
// ===== CRUD OPERATORS =========
import { Crud } from '@dataui/crud';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
    model: { type: PostEntity }
})

// 2. Define the controller for posts
@Controller('posts')
export class PostsController {
    // 3. Inject the service for posts
    constructor(public service: PostsService) { }
}