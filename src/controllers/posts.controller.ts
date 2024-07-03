// ========= IMPORTS =========
import { Controller, Get, UseInterceptors } from '@nestjs/common';
// ========= ENTITIES =========
import { PostEntity } from '@entities/index';
// ========= SERVICES =========
import { PostsService } from '@services/index';
// ========= CRUD OPERATORS =========
import { Crud, CrudOptions, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@dataui/crud';

// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
    model: {
        type: PostEntity
    },
    query: {
        limit: 25, // Set the default limit to 10 results per page
        alwaysPaginate: false, // Set `true` to always paginate the results 
        join: {
            // Set `true` to join the comments on each post
            comments: {
                eager: false // Set `true` to eagerly load comments on each post
            },
            likes: {
                eager: false // Set `true` to eagerly load likes on each post
            },
            'comments.users': {
                eager: false // Set `true` to eagerly load user on each comment
            },
            user: {
                eager: false
            }
        }
    }
} as CrudOptions)

// 2. Define the controller for posts
@Controller('posts')
export class PostsController {
    // 3. Inject the service for posts --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
    constructor(public service: PostsService) { }

    // ========= METHODS =========

    /*  @UseInterceptors(CrudRequestInterceptor)
     @Get('find-all')
     async findAll(@ParsedRequest() req: CrudRequest) {
         return this.service.find();
     } */


    // TODO : Custom CRUD service method IF NECESSARY (For Swagger)
    /*     @Get('find-all')
        findAll() {
            return this.service.find();
        } */
}