// ====== IMPORTS =========
import { Injectable } from '@nestjs/common';
import { genSalt, hashSync } from 'bcrypt';
import { CrudRequest } from '@dataui/crud';
// ====== SERVICES =========
import { UsersService } from '@services/index';
import { JwtService } from '@nestjs/jwt';
// ====== ENTITIES =========
import { UserEntity } from '@entities/index';

@Injectable()
export class AuthService {
    /** Initializes a new instance of the `AuthService` class.
     * @param {UsersService} userService - The service providing user-related functionality.
     * @param {JwtService} jwtService - The service providing JWT token functionality.
     * @return {void} No return value.
     */
    constructor(
        public readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /** Validates a user based on the provided email and password.
     * @param {string} email - The email of the user to validate.
     * @param {string} pass - The password of the user to validate.
     * @return {Promise<Partial<UserEntity>>} A partial UserEntity if validation succeeds, otherwise null.
     */
    async validateUser(
        email: string,
        pass: string,
    ): Promise<Partial<UserEntity>> {
        // 1. Find the user in the database by email
        const user = await this.userService.findOne(null, { where: { email } });
        // 2. If the user exists and the password is correct, return the user
        if (user && user.password === hashSync(pass, user.salt)) {
            // 3. If the user exists and the password is correct, return the user
            const { salt, password, ...userRest } = user;
            return userRest;
        }
        return null;
    }

    /** Generates a login token for the provided user.
     * @param {Partial<UserEntity>} user - The user object containing the email, id, and role.
     * @return {Promise<Partial<UserEntity>>} A promise that resolves to a partial user object with the access token.
     */
    async login(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        // Generate a JWT token with the user's email, id, and role
        const payload = { email: user.email, id: user.id, role: user.role };
        // Sign the payload with the secret key and return the access token
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        try {
            const data = await this.userService.userRepository.save(user);
            return data;
        } catch (error) {
            return error;
        }
    }
}