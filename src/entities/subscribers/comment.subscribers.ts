// ====== ENTITY =========
import { CommentEntity, PostEntity } from '@entities/index';
// ====== IMPORTS =========
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
} from 'typeorm';

//  The @EventSubscriber() decorator indicates that this class will listen for events related to the CommentEntity entity.
@EventSubscriber()
export class CommentSubscriber
  implements EntitySubscriberInterface<CommentEntity>
{
  /** Returns the CommentEntity class.
   * @return {typeof CommentEntity} The CommentEntity class.
   */
  listenTo() {
    return CommentEntity;
  }

  async afterInsert(event: InsertEvent<CommentEntity>) {
    // 1. Get the repository for posts from the event manager
    const postRepository: Repository<PostEntity> =
      event.connection.manager.getRepository<PostEntity>('posts');
    // 2. Get the repository for comments from the event manager
    const commentRepository: Repository<CommentEntity> =
      event.connection.manager.getRepository<CommentEntity>('comments');
    // 3. Count the number of comments for the post
    commentRepository
      .count({
        // 3.1 Specify the post id in the where clause
        where: {
          posts: {
            id: event.entity.posts.id, // post id
          },
        },
      })
      .then((count: number) => {
        // 4. Update the post entity with the number of comments
        postRepository.update(
          { id: event.entity.post_id }, // 4.1 Specify the post id in the where clause
          { comments_num: count }, // 4.2 Update the post entity with the number of comments
        );
      });
  }
}
