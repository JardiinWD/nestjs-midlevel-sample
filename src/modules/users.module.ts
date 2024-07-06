// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { UsersController } from '@controllers/index';
// ======== SERVICE =========
import { UsersService } from '@services/index';

// ======== ENTITIES =========
import { UserEntity } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
