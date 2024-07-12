## Services

- **[auth.service.ts](auth.service.ts)**: This file contains the service for authentication. It provides methods for user authentication and authorization.
- **[users.service.ts](users.service.ts)**: This file contains the service for the Users entity. It provides methods for user management.
- **[posts.service.ts](posts.service.ts)**: This file contains the service for the Posts entity. It provides methods for post management.
- **[comments.service.ts](comments.service.ts)**: This file contains the service for the Comments entity. It provides methods for comment management.
- **[likes.service.ts](likes.service.ts)**: This file contains the service for the Likes entity. It provides methods for like management.
- **[user-followers.service.ts](user-followers.service.ts)**: This file contains the service for the UserFollowers entity. It provides methods for user follower management.
- **[files.service.ts](files.service.ts)**: This file contains the service for the Files entity. It provides methods for file management.
- **[generic.service.ts](generic.service.ts)**: This file contains the service for the Generic entity. It provides methods for generic management.

## auth.service.ts

The `auth.service.ts` file contains the service for authentication. It provides methods for user authentication and authorization. This service is responsible for validating users, generating login tokens, and registering new users. 

- The `validateUser` method takes an email and password as parameters and returns a promise that resolves to a partial UserEntity if the validation succeeds, otherwise it resolves to null. 

- The `login` method takes a user object as a parameter and returns a promise that resolves to a partial UserEntity. The user object contains the user's email, password, and other user information. 

- The `register` method takes a user object as a parameter and returns a promise that resolves to a partial UserEntity. The user object contains the user's email, password, and other user information. 

These methods are used to authenticate and authorize users in the system.


| Method | Description | Params |
| --- | --- | --- |
| `validateUser(email: string, pass: string): Promise<Partial<UserEntity>>` | Validates a user based on the provided email and password. | `email: string`, `pass: string` |
| `login(user: Partial<UserEntity>): Promise<Partial<UserEntity>>` | Generates a login token for the provided user. | `user: Partial<UserEntity>` |
| `register(user: Partial<UserEntity>): Promise<Partial<UserEntity>>` | Registers a new user in the system. | `user: Partial<UserEntity>` |

## users.service.ts

The `users.service.ts` file contains the service for the Users entity. It provides methods for user management. These methods are used to interact with the Users entity in the database and perform various operations such as finding, updating, and deleting users. The methods also include additional features like finding users by their email, username, and ID with pagination.

| Method | Description | Params |
| --- | --- | --- |
| `findAll(): Promise<UserEntity[]>` | Finds all users in the database. | None |
| `findOne(id: string): Promise<UserEntity>` | Finds a user by their ID. | `id: string` |
| `update(id: string, user: UpdateUserDto): Promise<UserEntity>` | Updates a user by their ID. | `id: string`, `user: UpdateUserDto` |
| `remove(id: string): Promise<void>` | Deletes a user by their ID. | `id: string` |
| `findByEmail(email: string): Promise<UserEntity>` | Finds a user by their email. | `email: string` |
| `findAndCount(options: FindManyOptions<UserEntity>): Promise<[UserEntity[], number]>` | Finds users with pagination and returns the total count. | `options: FindManyOptions<UserEntity>` |
| `create(user: CreateUserDto): Promise<UserEntity>` | Creates a new user. | `user: CreateUserDto` |
| `updateMe(id: string, user: UpdateUserDto): Promise<UserEntity>` | Updates the user with the same ID as the authenticated user. | `id: string`, `user: UpdateUserDto` |
| `findMe(id: string): Promise<UserEntity>` | Finds the user with the same ID as the authenticated user. | `id: string` |
| `removeMe(id: string): Promise<void>` | Deletes the user with the same ID as the authenticated user. | `id: string` |
| `findByUsername(username: string): Promise<UserEntity>` | Finds a user by their username. | `username: string` |


## generic.service.ts

The `generic.service.ts` file contains the service for the Generic entity. It provides methods for generic management. This service is used for handling generic operations that do not fit into other specific services. The service provides methods for creating, finding, updating, and deleting generic entities in the database.

| Method | Description | Params |
| --- | --- | --- |
| `create(data: any): Promise<GenericEntity>` | Creates a new generic entity in the database. | `data: any` |
| `findOne(id: string): Promise<GenericEntity>` | Finds a generic entity by its ID. | `id: string` |
| `update(id: string, data: any): Promise<GenericEntity>` | Updates a generic entity by its ID. | `id: string`, `data: any` |
| `remove(id: string): Promise<void>` | Deletes a generic entity by its ID. | `id: string` |
| `findByQuery(query: any): Promise<GenericEntity[]>` | Finds generic entities by a query. | `query: any` |

## posts.service.ts

The `posts.service.ts` file is responsible for handling operations related to posts. This service interacts with the database to create, retrieve, update, and delete posts. It provides methods tailored to manage post entities efficiently.

| Method | Description | Params |
| --- | --- | --- |
| `createPost(data: CreatePostDto): Promise<PostEntity>` | Creates a new post in the database. | `data: CreatePostDto` |
| `findPostById(id: string): Promise<PostEntity>` | Retrieves a post by its ID. | `id: string` |
| `updatePost(id: string, data: UpdatePostDto): Promise<PostEntity>` | Updates a post by its ID. | `id: string`, `data: UpdatePostDto` |
| `deletePost(id: string): Promise<void>` | Deletes a post by its ID. | `id: string` |
| `findAllPosts(query: FindManyOptions<PostEntity>): Promise<PostEntity[]>` | Retrieves all posts based on the given query. | `query: FindManyOptions<PostEntity>` |

## files.service.ts

The `files.service.ts` file is responsible for handling operations related to files. It provides methods to save, map, and retrieve files from the database. 

| Method | Description | Params |
| --- | --- | --- |
| `saveFileOnDatabase(file: Express.Multer.File, newFileName: string): Promise<FileEntity>` | Saves a file to the database. | `file: Express.Multer.File` - The file to be saved. <br> `newFileName: string` - The new name for the file. |
| `mapUploadFile(file: Express.Multer.File, newFileName: string): Partial<FileEntity>` | Maps the uploaded file data to a partial FileEntity object. | `file: Express.Multer.File` - The file object containing originalname, mimetype, and size. <br> `newFileName: string` - The new file name. |

## likes.service.ts

The `likes.service.ts` file is responsible for handling operations related to likes. It provides methods to create, retrieve, update, and delete likes. It uses the `@Crud` decorator to set up CRUD operations for the `LikeEntity` model. This service is used for managing likes in the application.

| Method | Description | Params |
| --- | --- | --- |
| `createLike(data: CreateLikeDto): Promise<LikeEntity>` | Creates a new like in the database. | `data: CreateLikeDto` |
| `findLikeById(id: string): Promise<LikeEntity>` | Retrieves a like by its ID. | `id: string` |
| `updateLike(id: string, data: UpdateLikeDto): Promise<LikeEntity>` | Updates a like by its ID. | `id: string`, `data: UpdateLikeDto` |
| `deleteLike(id: string): Promise<void>` | Deletes a like by its ID. | `id: string` |

## comments.service.ts

The `comments.service.ts` file is responsible for handling operations related to comments. It provides methods to create, retrieve, update, and delete comments. It uses the `@Crud` decorator to set up CRUD operations for the `CommentEntity` model. This service is used for managing comments in the application.

| Method | Description | Params |
| --- | --- | --- |
| `createComment(data: CreateCommentDto): Promise<CommentEntity>` | Creates a new comment in the database. | `data: CreateCommentDto` |
| `findCommentById(id: string): Promise<CommentEntity>` | Retrieves a comment by its ID. | `id: string` |
| `updateComment(id: string, data: UpdateCommentDto): Promise<CommentEntity>` | Updates a comment by its ID. | `id: string`, `data: UpdateCommentDto` |
| `deleteComment(id: string): Promise<void>` | Deletes a comment by its ID. | `id: string` |

## user-followers.service.ts

The `user-followers.service.ts` file is responsible for handling operations related to user followers. It provides methods to create, retrieve, update, and delete user followers. It uses the `@Crud` decorator to set up CRUD operations for the `UserFollowerEntity` model. This service is used for managing user followers in the application.

| Method | Description | Params |
| --- | --- | --- |
| `createUserFollower(data: CreateUserFollowerDto): Promise<UserFollowerEntity>` | Creates a new user follower in the database. | `data: CreateUserFollowerDto` |
| `findUserFollowerById(id: string): Promise<UserFollowerEntity>` | Retrieves a user follower by its ID. | `id: string` |
| `updateUserFollower(id: string, data: UpdateUserFollowerDto): Promise<UserFollowerEntity>` | Updates a user follower by its ID. | `id: string`, `data: UpdateUserFollowerDto` |
| `deleteUserFollower(id: string): Promise<void>` | Deletes a user follower by its ID. | `id: string` |

