// ====== STRATEGIES ======
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
// ====== IMPORTS ======
import { Injectable, UnauthorizedException } from '@nestjs/common';
// ====== SERVICES ======
import { AuthService } from '@services/index';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /** Initializes a new instance of the `LocalStrategy` class.
   * @param {AuthService} authService - The authentication service used for local strategy.
   */
  constructor(private readonly authService: AuthService) {
    // Call the super class constructor
    super({
      usernameField: 'email', // --> 'username' will be deprecated
      passwordField: 'password', // --> 'password' will be deprecated
    });
  }

  /** Validates a user's email and password using the authentication service.
   * @param {string} email - The email of the user to validate.
   * @param {string} password - The password of the user to validate.
   * @return {Promise<any>} A Promise that resolves to the validated user if successful, or rejects with an UnauthorizedException if the user is not valid.
   */
  async validate(email: string, password: string): Promise<any> {
    // 1. Validate the user's credentials using the authentication service
    const user = await this.authService.validateUser(email, password);
    // 2. If the user is not valid, throw an UnauthorizedException
    if (!user) throw new UnauthorizedException();
    // 3. If the user is valid, return the user
    return user;
  }
}
