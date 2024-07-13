import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    type: 'postgres', // Neon PostgreSQL database type
    host: process.env.DATABASE_HOST || 'localhost', // Database host
    database: process.env.DATABASE_NAME, // Database name 
    port: process.env.DATABASE_PORT, // Database port
    username: process.env.DATABASE_USER, // Database user
    password: process.env.DATABASE_PASSWORD, // Database password
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`], // Entities to be stored in the database (Users and Reports)
    subscribers: [`${__dirname}/../**/*.subscriber{.ts,.js}`], // Subscribers for the entities (Users and Reports)
    synchronize: process.env.NODE_ENV === 'development', // Set `true` to synchronize the database schema with the entities
    logging: process.env.NODE_ENV === 'development', // Set `true` to enable logging
    ssl: true, // Set `true` to enable SSL
    connection: {
        // Options allow to connect to the database using a connection string
        options: `project=${process.env.DATABASE_ENDPOINT_ID}`,
    },
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`], // Migrations for the database
    migrationsTableName: 'migrations', // Set the name of the migrations table
}))