// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Initializes a new instance of the `GenericService` class.
 * This class is used to provide a generic way of interacting with entities in the application,
 * such as users, posts, comments, etc. It provides a common interface for CRUD operations,
 * and can be used with any entity that has a corresponding repository in the application.
 */
export class GenericService {
    pocket: any;
    constructor() {
        this.pocket = Object.create(null);
    }
}