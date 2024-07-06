// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== SERVICE =========
import { UserFollowersService } from '@services/index';
// ======== ENTITIES =========
import { UserFollowerEntity } from '@entities/index';
// ======== CONTROLLERS =========
import { UserFollowersController } from '@controllers/index';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollowerEntity])],
  controllers: [UserFollowersController],
  providers: [UserFollowersService],
})
export class UserFollowersModule {}
