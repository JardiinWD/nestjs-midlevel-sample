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

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Set `true` for global configuration
      envFilePath: `.env`, // Set the path to the .env file based on the NODE_ENV --> ${process.env.NODE_ENV}.env
    }),
    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inject the ConfigService in the AppModule
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres', // Neon PostgreSQL database type
          host: configService.get<string>('DATABASE_HOST'), // Database host from the .env file
          database: configService.get<string>('DATABASE_NAME'), // Database name from the .env file
          port: configService.get<number>('DATABASE_PORT'), // Database port from the .env file
          username: configService.get<string>('DATABASE_USER'), // Database user from the .env file
          password: configService.get<string>('DATABASE_PASSWORD'), // Database password from the .env file
          entities: [
            UserEntity,
            PostEntity,
            CommentEntity,
            LikeEntity,
            UserFollowerEntity,
            FileEntity,
          ], // Entities to be stored in the database (Users and Reports)
          subscribers: [CommentSubscriber], // Subscribers for the entities (Users and Reports)
          synchronize: true, // Set `true` to synchronize the database schema with the entities
          ssl: true, // Set `true` to enable SSL
          connection: {
            // Options allow to connect to the database using a connection string
            options: `project=${configService.get<string>('DATABASE_ENDPOINT_ID')}`,
          },
        };
      },
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
export class AppModule {}
