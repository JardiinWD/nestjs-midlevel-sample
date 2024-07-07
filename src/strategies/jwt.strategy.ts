// ======== STRATEGIES =========
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
// ======== IMPORTS =========
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_STRATEGY_SECRET,
    });
  }

  /** Validates the payload and returns an object containing the id, email, and role properties.
   * @param {any} payload - The payload to be validated.
   * @return {Promise<{ id: any, email: any, role: any }>} An object containing the id, email, and role properties.
   */
  async validate(payload: any) {
    // Validate the payload and return an object containing the id, email, and role properties
    return {
      id: payload.id, // Extract the id property from the payload
      email: payload.email, // Extract the email property from the payload
      role: payload.role, // Extract the role property from the payload
    };
  }
}
