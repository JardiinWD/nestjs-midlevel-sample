// ====== ENTITIES =========
import { PostEntity } from "@entities/index";
// ====== IMPORTS =========
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";


/**
 * The Validator Constraint is a class decorator that implements the ValidatorConstraintInterface.
 * It is used to create custom validation constraints for the class-validator library.
 * The UniqueTitleConstraint is a validator that asynchronously validates the uniqueness of the title.
 * It is used to check if the title already exists in the database.
 */

@ValidatorConstraint({ async: true })
export class UniqueTitleConstraint implements ValidatorConstraintInterface {

    /**  Asynchronously validates the uniqueness of the title.
     * @param {string} title - The title to be validated.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the title is unique, `false` otherwise.
     */
    async validate(title: string): Promise<boolean> {
        // Inject the repository for posts into the validator constraint
        const postRepo: Repository<PostEntity> = await (await import('../entities/post.entity')).default
        // Check if the title already exists in the database and return the result
        const data = await postRepo.findOne({ where: { title: title } })
        // Return the result of the check (whether the title is unique or not)
        return !!!data;
    }
}

/** Decorator function that registers a custom validation constraint for the uniqueness of the title.
 * @param {ValidationArguments} [validationOptions] - Optional validation options.
 * @return {(obj: object, propertyName: string) => void} - A function that registers the custom validation constraint.
 * @param {object} - `obj` (object): The object that contains the property.
 * @param {string} `- propertyName` (string): The name of the property.
 * @param {constructor} - `target` (constructor): The class that contains the property.
 * @param {ValidationArguments} - `options` (ValidationArguments): The validation options.
 * @param {UniqueTitleConstraint}  - `validator` (UniqueTitleConstraint): The validator constraint.
 */
export function IsUniqueTitle(options?: ValidationOptions) {
    return (obj: object, propertyName: string) => {
        registerDecorator({
            target: obj.constructor, // The class that contains the property
            propertyName: propertyName, // The name of the property
            options: options, // The validation options
            validator: UniqueTitleConstraint, // The validator constraint
            async: true
        })
    }
}
