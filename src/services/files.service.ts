// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ====== ENTITIES =========
import { FileEntity } from '@entities/index';
// ====== SERVICES =========
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity> {
  /** Constructor for the FilesService class.
   * @param {Repository<FileEntity>} fileRepo - The repository for FileEntity objects.
   * @return {void}
   */
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {
    super(fileRepo);
  }

  // ====== METHODS ======

  /** Saves a file to the database.
   * @param {Express.Multer.File} file - The file to be saved.
   * @param {string} newFileName - The new name for the file.
   * @return {Promise<FileEntity>} A promise that resolves to the saved FileEntity.
   */
  async saveFileOnDatabase(
    file: Express.Multer.File,
    newFileName: string,
  ): Promise<FileEntity> {
    return this.fileRepo.save(this.mapUploadFile(file, newFileName));
  }

  /** Maps the uploaded file data to a partial FileEntity object.
   * @param {Express.Multer.File} file - The file object containing originalname, mimetype, and size.
   * @param {string} newFileName - The new file name.
   * @return {Partial<FileEntity>} A partial FileEntity object with mapped data.
   */
  private mapUploadFile(
    { originalname, mimetype, size }: Express.Multer.File,
    newFileName: string,
  ): Partial<FileEntity> {
    // const { originalname, mimetype, size } = file;
    return {
      original_name: originalname, // 'image.png'
      size, // 1024
      current_name: newFileName, // 'image-1024.png'
      extention: mimetype.split('/')[1], // mimetype: 'image/jpeg'
    };
  }
}
