## Strategies Definitions

- **[jwt.strategy.ts](jwt.strategy.ts)**: This file contains the strategy for JWT authentication. It provides methods for user authentication and authorization.
- **[local.strategy.ts](local.strategy.ts)**: This file contains the strategy for local authentication. It provides methods for user authentication and authorization.


## JWT Strategy

The `JwtStrategy` class is a passport strategy for JWT authentication. It extends the `PassportStrategy` class from the `@nestjs/passport` package. It provides methods for user authentication and authorization. The `constructor()` method initializes a new instance of the `JwtStrategy` class. It sets up the options for the JWT strategy, including extracting the JWT from the Authorization header, ignoring the expiration of the JWT, and using the secret key defined in the .env file. The `validate(payload: any)` method validates the payload and returns an object containing the id, email, and role properties. It extracts these properties from the payload and returns them in an object. The `JwtStrategy` class is used to authenticate users using JWT tokens. It is typically used in conjunction with the `AuthGuard` class to protect routes that require authentication.

| Methods | Description | Params |
| :------ | :---------- | :----- |
| `constructor()` | Initializes a new instance of the `JwtStrategy` class. | None |
| `validate(payload: any)` | Validates the payload and returns an object containing the id, email, and role properties. | `payload` (The payload to be validated.) |

## Local Strategy

The `LocalStrategy` class is a passport strategy for local authentication. It extends the `PassportStrategy` class from the `@nestjs/passport` package. It provides methods for user authentication and authorization. The `constructor()` method initializes a new instance of the `LocalStrategy` class. It sets up the options for the local strategy, including extracting the username and password from the request body. The `validate(username: string, password: string)` method validates the username and password and returns an object containing the id, email, and role properties. It extracts these properties from the database and returns them in an object. The `LocalStrategy` class is used to authenticate users using their username and password. It is typically used in conjunction with the `AuthGuard` class to protect routes that require authentication.

| Methods | Description | Params |
| :------ | :---------- | :----- |
| `constructor()` | Initializes a new instance of the `LocalStrategy` class. | None |
| `validate(username: string, password: string)` | Validates the username and password and returns an object containing the id, email, and role properties. | `username` (The username to be validated.) | `password` (The password to be validated.) |






