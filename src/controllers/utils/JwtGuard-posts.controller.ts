// ========= IMPORTS =========
import { Controller, UseGuards } from '@nestjs/common';
// ========= ENTITIES =========
import { PostEntity, UserEntity } from '@entities/index';
// ========= SERVICES =========
import { PostsService } from '@services/index';
// ========= CRUD OPERATORS =========
import { Crud, CrudAuth, CrudOptions } from '@dataui/crud';
// ========= GUARDS =========
import { JwtAuthGuard } from '@guards/index';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
  model: {
    type: PostEntity,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  params: {
    limit: 10, // Set the default limit to 10 results per page
    page: 1, // Set the default page to 1
  },
  query: {
    limit: 10, // Set the default limit to 10 results per page
    alwaysPaginate: true, // Set `true` to always paginate the results
    join: {
      // Set `true` to join the comments on each post
      comments: {
        eager: false, // Set `true` to eagerly load comments on each post
      },
      likes: {
        eager: false, // Set `true` to eagerly load likes on each post
      },
      'comments.users': {
        eager: false, // Set `true` to eagerly load user on each comment
      },
      user: {
        eager: false,
      },
    },
  },
} as CrudOptions)
// 2. Define the guard for users
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user', // Define the property for the user
  // Define the filter for the user for showing only the posts created by the user
  filter: (user: UserEntity) => ({ user_id: user.id }),
})
// 3. Define the controller for posts
@Controller('posts')
export class JwtGuardPostsController {
  // 4. Inject the service for posts --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
  constructor(public service: PostsService) {}

  // ========= METHODS =========
}
