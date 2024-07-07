// ======== MODULES =========
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/index';
import { JwtModule } from '@nestjs/jwt';
// ======== CONTROLLERS =========
import { AuthController } from '@controllers/index';
// ======== STRATEGIES =========
import { JwtStrategy, LocalStrategy } from '@strategies/index';
// ======== SERVICES =========
import { AuthService } from '@services/index';
// ======== IMPORTS =========
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_STRATEGY_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
