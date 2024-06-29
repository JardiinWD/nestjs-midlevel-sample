// ======== MODULES =========
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule, PostsModule, CommentsModule, LikesModule, UserFollowersModule } from '@modules/index';
// ======== CONTROLLERS =========
import { AppController } from './app.controller';
// ======== SERVICES =========
import { AppService } from './app.service';
// ======== ENTITIES =========
import { UserEntity, PostEntity, CommentEntity, LikeEntity, UserFollowerEntity } from '@entities/index';
// ======== CONFIG =========
import { ConfigModule, ConfigService } from '@nestjs/config';



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
          entities: [UserEntity, PostEntity, CommentEntity, LikeEntity, UserFollowerEntity], // Entities to be stored in the database (Users and Reports)
          synchronize: true, // Set `true` to synchronize the database schema with the entities
          ssl: true, // Set `true` to enable SSL
          connection: {
            // Options allow to connect to the database using a connection string
            options: `project=${configService.get<string>('DATABASE_ENDPOINT_ID')}`
          }
        };
      },
    }),
    // Other imports
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => LikesModule),
    forwardRef(() => UserFollowersModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
