// ========= IMPORTS =========
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// ========= ENTITIES =========
import { PostEntity } from '@entities/index';
// ========= SERVICES =========
import { PostsService } from '@services/index';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private service: PostsService) {}

  /** Asynchronously determines if the user is allowed based on the request context.
   * @param {ExecutionContext} context - The execution context of the request.
   * @return {Promise<boolean>} A boolean indicating if the user is allowed.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request from the context
    const request = context.switchToHttp().getRequest();
    // Get the user and body from the request
    const user = (request as any).user;
    const body = (request as any).body;
    // Check if the user is allowed
    console.log({ params: request.params, body, user, IsOwnerGuard: true });
    return this.isUserAllowed(+request.params.id, +user.id);
  }

  /** Asynchronously checks if the user with the given ID is the owner of the post with the given ID.
   * @param {number} id - The ID of the post to check ownership for.
   * @param {number} user_id - The ID of the user to check ownership against.
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating whether the user is the owner of the post.
   */
  private async isUserAllowed(id: number, user_id: number): Promise<boolean> {
    // Check if the user is allowed
    const post: Partial<PostEntity> = await this.service.postRepository.findOne(
      id as any,
    );
    console.log({ postIsFound: post });
    // return the result of the check if the user is the owner of the post
    return post.user_id === user_id;
  }
}
