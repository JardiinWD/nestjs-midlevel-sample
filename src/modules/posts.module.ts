// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { PostsController } from '@controllers/index';
// ======== SERVICE =========
import { PostsService } from '@services/index';
// ======== ENTITIES =========
import { PostEntity } from '@entities/index';


@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    controllers: [PostsController],
    providers: [PostsService, PostEntity],
})

export class PostsModule { }