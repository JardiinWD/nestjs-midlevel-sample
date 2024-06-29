// ======== IMPORTS =========
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();
// ======== ENTITIES =========
import { EntityManager } from "typeorm";
import { CommentEntity, PostEntity, UserEntity } from "@entities/index";
import { Roles } from '@entities/user.entity';


export class Seed {
    // 1. Define an array of partial UserEntity objects
    private users: Array<Partial<UserEntity>>;
    private posts: Array<Partial<PostEntity>>;


    constructor(private readonly entityManager: EntityManager) {
        this.users = []; // Initialize the array of partial UserEntity objects
        this.posts = []; // Initialize the array of partial PostEntity objects
    }

    /** A method to seed fake data based on the specified entity.
     * @param {any} entity - The entity for which to seed fake data.
     * @return {void} No return value.
     */
    seedFakeData<T>(entity: any): Promise<void> {
        // 1. Define a switch case for different entities
        switch (entity) {
            // 2. Add case for UserEntity
            case UserEntity:
                // 2.1 Call the userData method
                return this.addData(this.userData(), entity, (savedData: Array<Partial<UserEntity>>) => (this.users = savedData));
            case PostEntity:
                // 2.2 Call the postData method 
                return this.addData(this.postData(), entity, (savedData: Array<Partial<PostEntity>>) => (this.posts = savedData));
            case CommentEntity:
                // 2.3 Call the commentData method
                return this.addData(this.commentData(), entity);
            default:
                break;
        }
    }

    /** Generates an array of partial UserEntity objects based on the SEED_NUMBER environment variable or 100 if not set.
     * This method creates fake user data by generating random email addresses, names, roles, and about descriptions.
     * The number of user data objects generated is determined by the SEED_NUMBER environment variable, defaulting to 100.
     *
     * @private
     * @returns {Array<Partial<UserEntity>>} An array of partial UserEntity objects representing fake user data.
     * @param {string} email: A random email address generated by the faker library.
     * @param {string} name: A random first name and last name generated by the faker library, separated by a space.
     * @param {Roles} role: A random role from the Roles enum, either 'user' or 'admin'.
     * @param {string} about: A random sentence generated by the faker library.
     */
    private userData(): Array<Partial<UserEntity>> {
        return this.seedingArrayLength().map<Partial<UserEntity>>(() => {
            return {
                email: faker.internet.email(),
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                role: faker.helpers.arrayElement([Roles.user, Roles.admin]),
                about: faker.lorem.sentence()
            }
        })
    }


    /** Generates an array of partial PostEntity objects based on the SEED_NUMBER environment variable or 100 if not set.
     * This method creates fake post data by generating random titles, bodies, and users.
     * The number of post data objects generated is determined by the SEED_NUMBER environment variable, defaulting to 100.
     *
     * @private
     * @returns {Array<Partial<PostEntity>>} An array of partial PostEntity objects representing fake post data.
     * @param {string} title: A random sentence with 7 words generated by the faker library.
     * @param {string} body: A random paragraph generated by the faker library.
     * @param {UserEntity} user: A random user from the array of partial UserEntity objects.
     */
    private postData(): Array<Partial<PostEntity>> {
        return this.seedingArrayLength().map<Partial<PostEntity>>(() => {
            return {
                title: faker.lorem.words(4),
                body: faker.lorem.paragraph(),
                user: faker.helpers.arrayElement(this.users) as UserEntity
            }
        })
    }


    private commentData(): Array<Partial<CommentEntity>> {
        return this.seedingArrayLength().map<Partial<CommentEntity>>(() => {
            return {
                body: faker.lorem.sentence(),
                posts: faker.helpers.arrayElement(this.posts) as PostEntity,
                users: faker.helpers.arrayElement(this.users) as UserEntity
            }
        })
    }

    /** Returns an array of undefined values with a length determined by the value of the
     *  `SEED_NUMBER` environment variable, or 100 if the variable is not set.
     * @return {undefined[]} An array of undefined values.
     */
    private seedingArrayLength(): undefined[] {
        return Array.from({ length: +process.env.SEED_NUMBER || 100 })
    }


    /** Save an object in the database to create fake datas
     * @param {Array<Partial<T>>} data - The data to be saved in the database
     * @param {any} entity - The entity to save the data for
     * @param {(savedData: Array<Partial<T>>) => void} callback - The callback function to be called after the data is saved in the database
     * @return {void} No return value
     */
    private async addData<T>(data: Array<Partial<T>>, entity: any, callback?: (savedData: Array<Partial<T>>) => void): Promise<void> {
        // Save an object in the database to create fake datas
        return this.entityManager.save<T, T>(entity, data as any)
            .then((savedData: Array<Partial<T>>) => {
                // Check if there is a callback
                if (callback) {
                    callback(savedData);
                }
            })
            .catch((err) => console.log("Error generating fake data: ", err))
    }
}