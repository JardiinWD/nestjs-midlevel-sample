// ===== IMPORTS =========
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
// ===== ENTITIES =========
import { PostEntity } from '@entities/index';
// ===== SERVICES =========
import { PostsService } from '@services/index';

// 1. Define the controller for posts
@Controller('posts')
export class PostsController {
    // 3. Inject the service for posts
    constructor(private readonly postsService: PostsService) { }
}