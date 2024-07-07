// ======== IMPORTS =========
import {
   Controller,
   Request,
   Post,
   UseGuards,
   Body,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { genSalt, hashSync } from 'bcrypt';
// ======== SERVICES =========
import { AuthService } from '@services/index';
// ======== GUARDS =========
import { LocalAuthGuard } from '@guards/index';
// ======== ENTITITES =========
import { UserEntity, RolesEnum as Roles } from '@entities/index';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   /** Asynchronously handles the login request.
    * @param {@Request()} req - The Express Request object.
    * @return {Promise<any>} A Promise that resolves with the result of the login operation.
    */
   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@Request() req: Express.Request) {
      return this.authService.login(req.user);
   }

   /** Registers a new user with the provided information.
    * @param {Partial<UserEntity>} body - The user information to register.
    * @return {Promise<UserEntity>} The registered user with the password and salt fields removed.
    */
   @Post('register')
   async register(@Body() body: Partial<UserEntity>) {
      try {
         // 1. Generate a salt and hash the password
         const salt = await genSalt(10);
         // 2 Extract from the body the password and remove it from the body
         const { password, ...reset } = body;
         // 3. Create the user in the database
         const u: Partial<UserEntity> = {
            salt, // --> this.salt is generated in the constructor
            ...reset, // the reset object is extracted from the body
            password: hashSync(password, salt), // provide the password and the salt to the hashSync
            role: Roles.user, // --> role is set to 'user'
         };
         // 4. Invoke the register method in the authService
         const user = await this.authService.register(u);
         // Invoke the login method in the authService to log the user in
         const logedInUser = await this.authService.login(user);
         delete logedInUser.password;
         delete logedInUser.salt;
         return logedInUser;
      } catch (error) {
         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
   }
}
