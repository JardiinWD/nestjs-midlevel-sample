// ========= IMPORTS =========
import { Controller, Param, Request, UseGuards } from '@nestjs/common';
// ========= ENTITIES =========
import { PostEntity } from '@entities/index';
// ========= SERVICES =========
import { PostsService } from '@services/index';
// ========= CRUD OPERATORS =========
import {
  Crud,
  CrudController,
  CrudOptions,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';
// ========= GUARDS =========
import { IsOwnerGuard, JwtAuthGuard } from '@guards/index';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
  model: {
    type: PostEntity,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'deleteOneBase'],
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
// 3. Define the controller for posts
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
  // 4. Inject the service for posts --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
  constructor(public service: PostsService) {}

  // ========= METHODS =========

  /** Returns the base object of the PostsController.
   * @return {any} The base object of the PostsController.
   */
  get base(): any {
    return this;
  }

  /** Creates a new post entity with the given body and user ID.
   * @param {Express.Request} req - The Express request object.
   * @param {CrudRequest} parsedRequest - The parsed CrudRequest object.
   * @param {Partial<PostEntity>} body - The partial post entity body.
   * @return {Promise<PostEntity>} The newly created post entity.
   */
  @Override()
  @UseGuards(JwtAuthGuard)
  createOne(
    @Request() req: Express.Request,
    @ParsedRequest() parsedRequest: CrudRequest,
    @ParsedBody() body: Partial<PostEntity>,
  ) {
    // 1. Check in the console if the user is authenticated
    console.log({ user: (req as any).user, create: true });
    // 2. Create an object with the user ID
    const obj = { ...body, user_id: (req as any).user.id };
    // 3. Return the created object
    return this.base.createOneBase(parsedRequest, obj);
  }

  /** A description of the entire function.
   * @param {Express.Request} req - The Express request object.
   * @param {number} id - The ID parameter.
   * @param {CrudRequest} parsedRequest - The parsed CrudRequest object.
   * @param {Partial<PostEntity>} body - The partial post entity body.
   * @return {ReturnType} The updated post entity.
   */
  @Override('updateOneBase')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  updateOne(
    @Request() req: Express.Request,
    @Param('id') id: number,
    @ParsedRequest() parsedRequest: CrudRequest,
    @ParsedBody() body: Partial<PostEntity>,
  ) {
    // 1. Check in the console if the user is authenticated
    console.log({ user: (req as any).user, update: true, id });
    // 2. Create an object with the user ID
    const obj = { ...body, user_id: (req as any).user.id };
    // 3. Return the updated object
    return this.base.updateOneBase(parsedRequest, obj);
  }
}
