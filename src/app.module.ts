// ======== MODULES =========
import {
  CommentsModule,
  FilesModule,
  LikesModule,
  PostsModule,
  UserFollowersModule,
  UsersModule,
  AuthModule
} from '@modules/index';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// ======== CONTROLLERS =========
import { AppController } from './app.controller';
// ======== SERVICES =========
import { AppService } from './app.service';
// ======== CONFIG =========
import { AppConfig, DatabaseConfig } from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';




@Module({
  imports: [
    // API Rate Limiter
    ThrottlerModule.forRoot([{
      ttl: 10, // Time To Live in seconds
      limit: 2, // Requests Per Second 
    }]),
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Set `true` for global configuration
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule 
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService], // Inject the ConfigService
    }),
    // Other imports
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => LikesModule),
    forwardRef(() => UserFollowersModule),
    forwardRef(() => FilesModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule { }
