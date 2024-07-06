// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { CommentsController } from '@controllers/index';
// ======== SERVICE =========
import { CommentsService } from '@services/index';
// ======== ENTITIES =========
import { CommentEntity } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
