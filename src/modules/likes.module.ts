// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { LikesController } from '@controllers/index';
// ======== SERVICE =========
import { LikesService } from '@services/index';
// ======== ENTITIES =========
import { LikeEntity } from '@entities/index';

@Module({
    imports: [TypeOrmModule.forFeature([LikeEntity])],
    controllers: [LikesController],
    providers: [LikesService]
})
export class LikesModule { }
