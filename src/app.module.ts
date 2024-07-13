// ======== MODULES =========
import {
  CommentsModule,
  FilesModule,
  LikesModule,
  PostsModule,
  UserFollowersModule,
  UsersModule,
} from '@modules/index';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// ======== CONTROLLERS =========
import { AppController } from './app.controller';
// ======== SERVICES =========
import { AppService } from './app.service';
// ======== ENTITIES =========
import {
  CommentEntity,
  FileEntity,
  LikeEntity,
  PostEntity,
  UserEntity,
  UserFollowerEntity,
} from '@entities/index';
// ======== SUBSCRIBERS =========
import { CommentSubscriber } from '@subscribers/index';
// ======== CONFIG =========
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { AppConfig, DatabaseConfig } from '@config/index';



@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule { }
