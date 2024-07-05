// ======== MODULES =========
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { FilesController } from '@controllers/index';
// ======== SERVICE =========
import { FilesService } from '@services/index';
// ======== ENTITIES =========
import { FileEntity } from '@entities/index';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule { }
