
## Controller Definitions

- **[users.controller.ts](src/controllers/users.controller.ts)**: This file contains the controller for the Users entity. It provides CRUD operations for the UserEntity.
- **[posts.controller.ts](src/controllers/posts.controller.ts)**: This file contains the controller for the Posts entity. It provides CRUD operations for the PostEntity.
- **[comments.controller.ts](src/controllers/comments.controller.ts)**: This file contains the controller for the Comments entity. It provides CRUD operations for the CommentEntity.
- **[likes.controller.ts](src/controllers/likes.controller.ts)**: This file contains the controller for the Likes entity. It provides CRUD operations for the LikeEntity.
- **[user-followers.controller.ts](src/controllers/user-followers.controller.ts)**: This file contains the controller for the UserFollowers entity. It provides CRUD operations for the UserFollowerEntity.
- **[files.controller.ts](src/controllers/files.controller.ts)**: This file contains the controller for the Files entity. It provides CRUD operations for the FileEntity.
- **[auth.controller.ts](src/controllers/auth.controller.ts)**: This file contains the controller for authentication. It provides methods for user registration and login.


## users.controller.ts

### CRUD Options

This snippet is used to configure the CRUD operations for the Users entity. It sets up the following:

- It specifies the `UserEntity` as the model for the CRUD operations.
- It excludes the `createManyBase` and `createOneBase` routes from being generated.
- It defines a query that limits the number of results to 10 and always paginates the results.
- It defines joins for the `posts`, `followers`, and `following` relationships of the `UserEntity`.
- It also defines joins for the `followers` and `following` relationships of the `UserEntity` through the `followers` and `following` relationships respectively.

The joins are necessary because the `UserEntity` has relationships with other entities, such as `PostEntity`, `UserEntity`, and `UserEntity`. By joining these relationships, we can retrieve the associated data when retrieving a `UserEntity`.

The `exclude: ['salt']` option is used to exclude the `salt` field from the query results. This is because the `salt` field is a sensitive field and should not be exposed in the API response.

Overall, this snippet is used to configure the CRUD operations for the `UserEntity` in a way that includes the necessary joins and excludes sensitive fields.

### Controller Methods

The `@CrudAuth` decorator is used to protect the controller methods. It accepts an object with two properties:

1. `property`: This is the property on the request object that contains the user. In this case, the user is added to the request object by the `JwtAuthGuard`.
2. `filter`: This is a function that takes the user and returns a filter object. The filter object is used to filter the data that is returned by the controller methods. In this case, the filter object is `{ id: user.id }`, which means that only the user with the same ID as the authenticated user will be returned.

This decorator is used to ensure that only authenticated users can access the controller methods.

## auth.controller.ts

This file contains the controller for authentication. It provides methods for user registration and login.

### Methods

| Method | Description | Parameters |
| --- | --- | --- |
| `register` | Asynchronously handles the user registration request.  | `@Body()` body: Partial<UserEntity>` |
| `login` | Asynchronously handles the user login request. | `@Body()` body: Partial<UserEntity>, `@Req()` request: Request>` |

## files.controller.ts

### CRUD Options

This script sets up a CRUD controller for the `FileEntity` model. It configures the controller to only expose the `getOneBase` route. This means that the controller will only respond to GET requests to the root endpoint (`/files`).

The `FileEntity` model represents a file that is stored in the server. Each file has a `name`, `size`, and `type` field. The `type` field represents the MIME type of the file.

The `FileEntity` model uses the `@Crud` decorator to set up CRUD operations for the controller. The `model` property specifies the model to be used for this controller. The `routes` property specifies which routes to enable for this controller. In this case, only the `getOneBase` route is enabled.

This script is used to expose the file retrieval functionality of the server. Clients can use this endpoint to retrieve a specific file by its ID.


### Methods

| Method | Description | Params |
| --- | --- | --- |
| `saveFileOnDatabase` | Saves a file to the database. | `file: Express.Multer.File` - The file to be saved. <br> `newFileName: string` - The new name for the file. |
| `mapUploadFile` | Maps the uploaded file data to a partial FileEntity object. | `file: Express.Multer.File` - The file object containing originalname, mimetype, and size. <br> `newFileName: string` - The new file name. |

## likes.controller.ts

The `LikesController` is a CRUD controller for managing likes. It uses the `@Crud` decorator to set up CRUD operations for the `LikeEntity` model. It configures the controller to respond to GET requests to the root endpoint (`/likes`). 

The controller has a single constructor that injects the `LikesService` into the controller. This service is responsible for handling the business logic related to likes.

In summary, the `LikesController` provides a RESTful API for managing likes in the application.


## posts.controller.ts

### CRUD Options

The `PostsController` sets up a CRUD controller for the `PostEntity` model. It configures the controller to respond to the `createOneBase`, `updateOneBase`, and `deleteOneBase` routes. This means that the controller will respond to POST, PUT, and DELETE requests to the root endpoint (`/posts`). It also sets the default limit to 10 results per page and always paginates the results.

The `PostsController` also configures the controller to join the `comments`, `likes`, and `comments.users` entities on each post. This means that when a client requests a post, the controller will include the comments and likes associated with that post. Additionally, the controller will include the user associated with each comment.

Overall, the `PostsController` provides a RESTful API for managing posts in the application.

### Methods

The `PostsController` provides the following methods:

| Method | Description | Params |
| --- | --- | --- |
| `createOne` | Asynchronously handles the creation of a post. | `@Request()` req: Express.Request, `@ParsedRequest()` parsedRequest: CrudRequest, `@ParsedBody()` body: Partial<PostEntity> |
| `updateOne` | Asynchronously handles the updating of a post. | `@Param('id')` id: number, `@ParsedRequest()` parsedRequest: CrudRequest, `@ParsedBody()` body: Partial<PostEntity> |
| `deleteOne` | Asynchronously handles the deletion of a post. | `@Param('id')` id: number, `@Req()` req: Request |
| `getOne` | Asynchronously handles the retrieval of a single post. | `@Param('id')` id: number, `@Req()` req: Request |
| `getMany` | Asynchronously handles the retrieval of multiple posts. | `@Query()` query: CrudQuery, `@Req()` req: Request |
| `getCount` | Asynchronously handles the retrieval of the total count of posts. | `@Query()` query: CrudQuery, `@Req()` req: Request |

## user-followers.controller.ts

This file contains the controller for managing user followers. It provides methods for managing the following relationships between users:

- Following a user
- Unfollowing a user
- Getting a user's followers
- Getting a user's followees

The `UserFollowersController` sets up a CRUD controller for the `UserFollowerEntity` model. It configures the controller to respond to the `createOneBase`, `updateOneBase`, and `deleteOneBase` routes for the `/user-followers` endpoint. 

This controller is useful for managing users' follower and followee relationships. It allows users to follow and unfollow other users, and provides a way to retrieve the followers and followees of a given user.


## users.controller.ts

### CRUD Options

The `@Crud` decorator is used to configure CRUD operations for the controller. It takes an object as an argument that specifies the model and various options for the CRUD operations.

In this case, the `@Crud` decorator is used to configure CRUD operations for the `UserEntity` model. It sets up the following options:

- `model`: Specifies the `UserEntity` as the model for the CRUD operations.
- `routes`: Excludes the `createManyBase` and `createOneBase` routes from being generated. This means that the controller will not respond to POST and PUT requests to the root endpoint (`/users`).
- `query`: Sets up the query options for the CRUD operations. It excludes the `salt` field from the query results and sets the default limit to 10 results per page and always paginates the results.

These options are necessary because the `UserEntity` has relationships with other entities, such as `PostEntity`, `UserEntity`, and `UserEntity`. By configuring the CRUD operations with the appropriate options, we can retrieve the associated data when retrieving a `UserEntity`.

Overall, the `@Crud` decorator is used to configure the CRUD operations for the `UserEntity` in a way that includes the necessary joins and excludes sensitive fields.

<!-- Look at the script below. Check what it does then write a short description of the methods that are written within. Maybe with a table of contents? | methods | description | params | -->

<!-- Look at the script below. Check what it does then write a short description of what it does (and why) -->

<!-- Look at the script below. Check what it does then write a description of what it does (and why). As I said earlier you must check the snippet within the ```typescript  and write a documentation for it. Write as many thing as possible about the snippet and what it does. Don't forget anything -->