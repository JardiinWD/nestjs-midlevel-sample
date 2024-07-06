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
  model: { type: UserEntity },
  routes: {
    exclude: ['createManyBase', 'createOneBase'],
  },
  query: {
    exclude: ['salt'],
    limit: 10,
    alwaysPaginate: true,
    join: {
      // 1. Define the Join for posts
      posts: {
        eager: true,
      },
      // 1.2 Define the Join for followers
      followers: {
        eager: true,
      },
      // 1.3 Define the Join for following
      following: {
        eager: true,
      },
      // 1.4 Define the Join for followers
      'followers.followers': {
        eager: true,
        exclude: ['salt'], // IT IS NOT OPTIONAL IN THIS CASE.
        alias: 'user_followers', // Alias for the join table (in order to avoid conflicts)
      },
      // 1.5 Define the Join for following
      'following.following': {
        eager: true,
        exclude: ['salt'], // IT IS NOT OPTIONAL IN THIS CASE.
        alias: 'user_following', // Alias for the join table (in order to avoid conflicts)
      },
    },
  },
})
// 2. Define the controller for users
@Controller('users')
export class UsersController {
  // 3. Inject the service for users --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
  constructor(public service: UsersService) {}
}
