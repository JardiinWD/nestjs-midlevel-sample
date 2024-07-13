// ====== IMPORTS =========
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

// 1. Define a configuration for TypeORM
const configService = new ConfigService();

export default new DataSource({
    type: 'postgres', // Neon PostgreSQL database type
    host: configService.get<string>('DATABASE_HOST'), // Database host from the .env file
    database: configService.get<string>('DATABASE_NAME'), // Database name from the .env file
    port: configService.get<number>('DATABASE_PORT'), // Database port from the .env file
    username: configService.get<string>('DATABASE_USER'), // Database user from the .env file
    password: configService.get<string>('DATABASE_PASSWORD'), // Database password from the .env file
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`], // Entities to be stored in the database (Users and Reports)
    subscribers: [`${__dirname}/../**/*.subscriber{.ts,.js}`], // Subscribers for the entities (Users and Reports)
    synchronize: process.env.NODE_ENV === 'development', // Set `true` to synchronize the database schema with the entities
    logging: process.env.NODE_ENV === 'development', // Set `true` to enable logging
    ssl: true, // Set `true` to enable SSL
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`], // Migrations for the database
    migrationsTableName: 'migrations', // Set the name of the migrations table
})

