## Local Auth Guards

`canActivate(context: ExecutionContext)`: This method is used by the `LocalAuthGuard` to check if the request can be activated for local authentication. It extracts the `headers` from the request and checks if the `Authorization` header is present. If it is, it uses the `JwtStrategy` to validate the token and sets the user in the request. If the token is invalid, it throws an `UnauthorizedException`.

## JWT Auth Guards

`canActivate(context: ExecutionContext)`: This method is used by the `JwtAuthGuard` to check if the request can be activated for JWT authentication. It extracts the `headers` from the request and checks if the `Authorization` header is present. If it is, it uses the `JwtStrategy` to validate the token and sets the user in the request. If the token is invalid, it throws an `UnauthorizedException`.

## Is Owner Guards

`canActivate(context: ExecutionContext)`: This method is used by the `IsOwnerGuard` to check if the request can be activated for checking the ownership of a resource. It extracts the `user` and `params` from the request, and checks if the `user_id` from the `params` matches the `id` from the `user` object. If they do not match, it throws an `UnauthorizedException`.


| Method | Description | Params |
| --- | --- | --- |
| `canActivate(context: ExecutionContext)` | This method is used by the `IsOwnerGuard` to check if the request can be activated for checking the ownership of a resource. It extracts the `user` and `params` from the request, and checks if the `user_id` from the `params` matches the `id` from the `user` object. If they do not match, it throws an `UnauthorizedException`. | `context: ExecutionContext` |
| `isUserAllowed(id: number, user_id: number): Promise<boolean>` | This method asynchronously checks if the user with the given ID is the owner of the post with the given ID. It checks if the user is allowed by finding the post with the given ID and comparing the `user_id` of the post with the given `user_id`. If they do not match, it returns `false`, otherwise it returns `true`. | `id: number` - The ID of the post to check ownership for. `user_id: number` - The ID of the user to check ownership against. |

