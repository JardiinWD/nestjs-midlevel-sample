// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== SERVICE =========
import { UserFollowersService } from '@services/index';
// ======== ENTITIES =========
import { UserFollowerEntity } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollowerEntity])],
  controllers: [],
  providers: [UserFollowersService]
})


export class UserFollowersModule { }
