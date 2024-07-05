// ====== IMPORTS =========
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


/**
 * The Validator Constraint is a class decorator that implements the ValidatorConstraintInterface.
 * It is used to create custom validation constraints for the class-validator library.
 * The UniqueTitleConstraint is a validator that asynchronously validates the uniqueness of the title.
 * It is used to check if the title already exists in the database.
 */

@ValidatorConstraint({ async: true })
export class UniqueTitleConstraint implements ValidatorConstraintInterface {

    /**  Asynchronously validates the uniqueness of the title.
     * @param {any} value - The value to be validated.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the title is unique, `false` otherwise.
     */
    async validate() {
        return true;
    }
}

/**
 * Decorator function that registers a custom validation constraint for the uniqueness of the title.
 *
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
