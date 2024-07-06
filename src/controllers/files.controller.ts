// ====== IMPORTS ======
import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { readFile } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import * as sharp from 'sharp';
import { promisify } from 'util';
import { v4 } from 'uuid';
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
export class FilesController implements CrudController<FileEntity> {

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
            storage: memoryStorage(),
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
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
        // Verifica se il file esiste
        if (!file) {
            throw new BadRequestException('File non trovato');
        }
        // Estrae l'estensione dal mimetype del file
        const [, ext] = file.mimetype.split('/');
        // Genera un nome file unico usando UUID
        const filename = `${v4()}.${ext}`;
        // Salva l'immagine fisicamente
        await this.saveImages(filename, file);
        // Salva i metadati del file nel database
        return this.service.saveFileOnDatabase(file, filename);
    }


    /** Saves multiple resized versions of an image file to disk.
     * @param {string} ext - The file extension of the image file.
     * @param {Express.Multer.File} file - The image file to be saved.
     * @return {Promise<void>} A Promise that resolves when all resized versions of the image are saved.
     */
    private async saveImages(filename: string, file: Express.Multer.File): Promise<void> {
        // Estrae l'estensione dal mimetype del file
        const [, ext] = file.mimetype.split('/');

        // Verifica se l'estensione è tra quelle consentite
        if (['jpeg', 'jpg', 'png'].includes(ext)) {
            // Crea il percorso della directory di upload
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

            try {
                // Crea la directory se non esiste
                await fs.promises.mkdir(uploadsDir, { recursive: true });
                // Crea il percorso completo del file
                const filePath = path.join(uploadsDir, filename);
                // Scrive il file su disco
                await fs.promises.writeFile(filePath, file.buffer);
                console.log('File salvato correttamente:', filePath);
            } catch (err) {
                console.error('Errore durante il salvataggio del file:', err);
                throw err;
            }
        }
    }

}
