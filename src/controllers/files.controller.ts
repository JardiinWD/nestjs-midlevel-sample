// ====== IMPORTS =========
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    BadRequestException,
    Req,
} from '@nestjs/common';
import { readFile } from 'fs';
import { promisify } from 'util';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
const readFileAsyc = promisify(readFile);
import * as sharp from 'sharp';
// ====== SERVICES =========
import { FilesService } from '@services/index';
import { GenericService } from '@services/index';
// ====== ENTITIES =========
import { FileEntity } from '@entities/index';
// ====== CRUD =========
import { Crud, CrudController } from '@dataui/crud';


@Crud({
    model: {
        type: FileEntity,
    },
    routes: {
        only: ['getOneBase'],
    },
})
@Controller('files')
export class FilesController implements CrudController<FileEntity> {

    // 1. Inject the service 
    static genericService: GenericService;
    // 1.1 Create a sizes array to store the sizes
    private readonly sizes: string[];

    /** Initializes a new instance of the FilesController class.
     * @param {FilesService} service - The FilesService instance.
     * @param {GenericService} genericService - The GenericService instance.
     */
    constructor(public service: FilesService, genericService: GenericService) {
        FilesController.genericService = genericService;
        this.sizes = ['25X25', '50X50', '50X50', '200X200', '400X400', '900X900'];
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                /** A callback function to determine the destination path for storing the uploaded file.
                 * @param {Express.Request} req - The request object.
                 * @param {Express.Multer.File} file - The file object being uploaded.
                 * @param {Function} cb - The callback function to be executed upon determining the destination path.
                 */
                destination: (req: Express.Request, file: Express.Multer.File, cb) =>
                    cb(null, 'public/uploads'),

                /** A callback function to generate the filename for storing the uploaded file.
                 * @param {Express.Request} req - The request object.
                 * @param {Express.Multer.File} file - The file object being uploaded.
                 * @param {Function} cb - The callback function to be executed with the filename.
                 * @return {void} No return value.
                 */
                filename: (req: Express.Request, file: Express.Multer.File, cb) => {
                    // mimetype: 'image/jpeg',
                    const [, ext] = file.mimetype.split('/');
                    FilesController.genericService.pocket.filename = `${v4()}.${ext}`;
                    cb(null, FilesController.genericService.pocket.filename);
                },
            }),
            limits: {
                fileSize: 1e7, // the max file size in bytes, here it's 100MB,
                files: 1,
            },
        }),
    )

    /** Uploads a file and saves it to the database.
     * @param {Express.Multer.File} file - The file to be uploaded.
     * @param {Request} req - The request object.
     * @returns {Promise<FileEntity>} A promise that resolves to the saved FileEntity.
     * @throws {BadRequestException} If the file is not found.
     */
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request): Promise<FileEntity> {
        // 1 Check if the file exists
        if (!file) {
            // 1.1 If the file doesn't exist, throw an error
            throw new BadRequestException('File non trovato');
        }
        // 2. if the file exists, save it to the database
        const [, ext] = file.mimetype.split('/');
        // 2.1 Save the file to the database
        const filename = `${v4()}.${ext}`;
        // 2.2 Save the images
        await this.saveImages(filename, file);
        // 3. Save the file to the database
        return this.service.saveFileOnDatabase(file, filename);
    }

    /** * Saves multiple resized versions of an image to the public/uploads directory.
     * @param {string} ext - The file extension of the image.
     * @param {Express.Multer.File} file - The file object containing the image data.
     * @return {Promise<void>} A promise that resolves when all the resized images have been saved.
     */
    private async saveImages(ext: string, file: Express.Multer.File): Promise<void> {
        // 1. Check if the file is an image file
        if (['jpeg', 'jpg', 'png'].includes(ext)) {
            // 2. If the file is an image file, resize it and save it to the public/uploads directory
            this.sizes.forEach((s: string) => {
                const [size] = s.split('X'); // 25X25 => 25
                readFileAsyc(file.path) // read the file as a buffer
                    .then((b: Buffer) => {
                        return sharp(b)
                            .resize(+size) // resize the image
                            .toFile(
                                `${__dirname}/../../public/uploads/${s}/${FilesController.genericService.pocket.filename}`,
                            );
                    })
                    .then(console.log)
                    .catch(console.error);
            });
        }
    }
}