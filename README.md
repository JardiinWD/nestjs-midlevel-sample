# NestJS Midlevel Sample


This project is a sample of a mid-level application using NestJS. It includes CRUD operations for Users, Posts, Comments, Likes, User Followers and Files. It also includes authentication and authorization using JWT. All entities are defined in the `src/entities` folder, and services, controllers and modules are defined in the `src/modules` and `src/controllers` folders. The application uses TypeORM for database operations and Multer for file uploads. It also includes a seed script to populate the database with sample data.

## Installation

To install the project, run the following command:

```bash
yarn install
```

## Configuration and Environment Variables

You need to configure the environment variables in the `.env` file.

```env
DATABASE_HOST='YOUR_DATABASE_HOST'
DATABASE_USER='YOUR_DATABASE_USER'
DATABASE_PORT=YOUR_DATABASE_PORT
DATABASE_ENDPOINT_ID='YOUR_DATABASE_ENDPOINT_ID'
DATABASE_NAME='YOUR_DATABASE_NAME'
DATABASE_PASSWORD='YOUR_DATABASE_PASSWORD'

# ====== PORTS ====== #
NEST_PORT=YOUR_NEST_PORT

# ====== SEEDING ====== #
SEED_NUMBER = HOW_MANY_SEEDS_TO_GENERATE
IS_SEEDING = BOOLEAN
HASHSYNC_SECRET = 'YOUR_HASHSYNC_SECRET'

# ====== JWT STRATEGIES ====== #
JWT_STRATEGY_SECRET = 'YOUR_JWT_STRATEGY_SECRET'
JWT_EXPIRES_IN = 'YOUR_JWT_EXPIRES_IN'
```

## Running the application

To run the application, run the following command:

```bash
yarn start:dev
```

## Folders

In every folder there is a `readme.md` file that explains the purpose of the folder.