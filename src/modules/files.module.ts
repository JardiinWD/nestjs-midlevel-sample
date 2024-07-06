// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
// ======== CONTROLLERS =========
import { FilesController } from '@controllers/index';
// ======== SERVICE =========
import { FilesService, GenericService } from '@services/index';
// ======== ENTITIES =========
import { FileEntity } from '@entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, GenericService],
})
export class FilesModule {}
