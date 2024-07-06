// ====== IMPORTS ======
import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as sharp from 'sharp';
// ====== SERVICES ======
import { FilesService, GenericService } from '@services/index';
// ====== CRUD OPERATORS ======
import { Crud, CrudController } from '@dataui/crud';
// ====== ENTITIES ======
import { FileEntity } from '@entities/index';
// ====== VARIABLES ======
const readFileAsyc = promisify(readFile);


// 1. Initialize The @Crud decorator initializes CRUD operations for the controller based on the specified model.
@Crud({
    model: {
        type: FileEntity, // The model type for the files controller
    },
    routes: {
        only: ['getOneBase'], // Only allow the getOneBase route
    },
})


@Controller('files')
export class FilesController {

    // Generic service is used to interact with the database and perform
    static genericService: GenericService;
    // File service is used to interact with the files
    private readonly sizes: string[];

    /** Initializes a new instance of the `FilesController` class.
     * @param {FilesService} service - The service for interacting with files.
     * @param {GenericService} genericService - The generic service for database operations.
     */
    constructor(public service: FilesService, genericService: GenericService) {
        FilesController.genericService = genericService;
        // Initialize the sizes array with predefined sizes for the images
        this.sizes = ['25X25', '50X50', '50X50', '200X200', '400X400', '900X900'];
    }


    // ====== METHODS ======

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                /** Sets the destination path for file uploads.
                 * This function is responsible for determining the destination path for file uploads.
                 * @param {Express.Request} req - The request object.
                 * @param {Express.Multer.File} file - The file object.
                 * @param {Function} cb - The callback function.
                 * @return {void} This function does not return a value.
                */
                destination: (req: Express.Request, file: Express.Multer.File, cb) =>
                    cb(null, 'public/uploads'),

                /** * Generates a unique filename for the uploaded file and passes it to the callback function.
                 * @param {Express.Request} req - The request object.
                 * @param {Express.Multer.File} file - The file object.
                 * @param {Function} cb - The callback function that receives the generated filename.
                 * @return {void} This function does not return a value.
                 */
                filename: (req: Express.Request, file: Express.Multer.File, cb) => {
                    // 1. Get the extension of the uploaded file using the `mimetype` property
                    const [, ext] = file.mimetype.split('/');
                    // 2. Generate a unique filename using the `v4` function from the `uuid` module
                    FilesController.genericService.pocket.filename = `${v4()}.${ext}`;
                    // 3. Pass the generated filename to the callback function
                    cb(null, FilesController.genericService.pocket.filename);
                },
            }),
            limits: {
                fileSize: 1e7, // the max file size in bytes, here it's 100MB,
                files: 1, // the max number of files that can be uploaded
            },
        }),
    )

    /** Uploads a file and saves it to the database.
     * @param {Express.Multer.File} file - The file to be uploaded.
     * @return {Promise<FileEntity>} A promise that resolves to the saved FileEntity.
     */
    uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
        // 1. Get the extension of the uploaded file
        const [, ext] = file.mimetype.split('/');
        // 2. Save the file to the database
        this.saveImages(ext, file);
        // 3. Return the saved file entity
        return this.service.dbSave(file, FilesController.genericService.pocket.filename);
    }


    /** Saves multiple resized versions of an image file to disk.
     * @param {string} ext - The file extension of the image file.
     * @param {Express.Multer.File} file - The image file to be saved.
     * @return {Promise<void>} A Promise that resolves when all resized versions of the image are saved.
     */
    private async saveImages(ext: string, file: Express.Multer.File): Promise<void> {
        // 1. Check if the file extension is valid
        if (['jpeg', 'jpg', 'png'].includes(ext)) {
            // 2. If the file is an image, save the resized versions to disk
            this.sizes.forEach((s: string) => {
                // 2.1 Resize the image and save it to disk
                const [size] = s.split('X');
                // 2.2 Read the file as a Buffer
                readFileAsyc(file.path)
                    .then((b: Buffer) => {
                        return sharp(b)
                            .resize(+size)
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
