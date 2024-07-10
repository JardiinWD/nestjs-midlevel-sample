# src/entities/README.md

## Entity Definitions

This folder contains the definitions for the entities in the application.

### Entities

- **[comment.entity.ts](src/entities/comment.entity.ts)**: This file contains the definition for the Comment entity.
- **[file.entity.ts](src/entities/file.entity.ts)**: This file contains the definition for the File entity.
- **[generic.entity.ts](src/entities/generic.entity.ts)**: This file contains the definition for the Generic entity.
- **[like.entity.ts](src/entities/like.entity.ts)**: This file contains the definition for the Like entity.
- **[post.entity.ts](src/entities/post.entity.ts)**: This file contains the definition for the Post entity.
- **[user.entity.ts](src/entities/user.entity.ts)**: This file contains the definition for the User entity.
- **[user-follower.entity.ts](src/entities/user-follower.entity.ts)**: This file contains the definition for the UserFollower entity.

## Subscribers

This folder contains the subscribers for the entities.

### Subscribers

- **[comment.subscribers.ts](src/controllers/subscribers/comment.subscribers.ts)**: This file contains the subscriber for the Comment entity. 

## comment.entity.ts

This script is used to define the Comment entity. It extends the Generic entity and adds a `content` field. The `content` field is a string that stores the content of the comment.

The Comment entity also has several relationships with other entities. The `@ManyToOne` decorator is used to define these relationships. The `user_id` field is used to associate a comment with its author. The `@ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a comment belongs to a user, and that the `comments` property on a `UserEntity` instance should be updated when the `user_id` property on a `CommentEntity` instance is changed. The `post_id` field is used to associate a comment with a post. The `@ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a comment belongs to a post, and that the `comments` property on a `PostEntity` instance should be updated when the `post_id` property on a `CommentEntity` instance is changed.

## File Entity

This script is used to define the File entity. It extends the Generic entity and adds several fields. The `original_name`, `current_name`, `size`, and `extention` fields store information about the file. The `@ManyToOne` decorator is used to define relationships with other entities. The `@ManyToOne(() => PostEntity, (post: PostEntity) => post.files, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a file belongs to a post, and that the `files` property on a `PostEntity` instance should be updated when the `post_id` property on a `FileEntity` instance is changed.


## Generic Entity

This script is used to define a generic entity with two columns for creation and update timestamps. The `@CreateDateColumn` and `@UpdateDateColumn` decorators are used to define these columns. The `created_at` and `updated_at` fields are of type `Date` and are automatically populated with the current timestamp when a new instance of the entity is created or updated.

This generic entity is then extended by the other entity definitions in the application. This allows for code reuse and ensures that all entities have the same creation and update timestamps.


## Like Entity

This script is used to define the Like entity. It extends the Generic entity and adds a `type` field. The `type` field is an enum that stores the type of the like (happy, sad, angry, like, love). The `@ManyToOne` decorator is used to define relationships with other entities. The `@ManyToOne(() => UserEntity, (user: UserEntity) => user.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a like belongs to a user, and that the `likes` property on a `UserEntity` instance should be updated when the `user_id` property on a `LikeEntity` instance is changed. The `@ManyToOne(() => PostEntity, (post: PostEntity) => post.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a like belongs to a post, and that the `likes` property on a `PostEntity` instance should be updated when the `post_id` property on a `LikeEntity` instance is changed.


### User Follower Entity

This script is used to define the UserFollower entity. It extends the Generic entity and adds a `status` field and two relationships with other entities. The `status` field is an enum that stores the status of the follower relationship (pending, accepted, rejected). The `@ManyToOne` decorator is used to define relationships with other entities. The `@ManyToOne(() => UserEntity, (user: UserEntity) => user.followers, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user follower belongs to a user, and that the `followers` property on a `UserEntity` instance should be updated when the `user_id` property on a `UserFollowerEntity` instance is changed. The `@ManyToOne(() => UserEntity, (user: UserEntity) => user.following, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user follower follows a user, and that the `following` property on a `UserEntity` instance should be updated when the `following_id` property on a `UserFollowerEntity` instance is changed.

This entity allows for the implementation of a follower system where users can follow each other and accept or reject follow requests. The enum allows for different statuses of the follower relationship.


### Post Entity

This script is used to define the Post entity. It extends the Generic entity and adds several fields. The `title`, `content`, `image_url`, `image_original_name`, `image_size`, `image_extension`, `created_at`, and `updated_at` fields store information about the post. The `@ManyToOne` decorator is used to define relationships with other entities. The `@ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a post belongs to a user, and that the `posts` property on a `UserEntity` instance should be updated when the `user_id` property on a `PostEntity` instance is changed.

This entity allows for the implementation of a post system where users can create, edit, and delete their own posts. The post system is used to share information with other users, and the `created_at` and `updated_at` fields are used to keep track of the post's timeline. The `image_url`, `image_original_name`, `image_size`, and `image_extension` fields are used to store information about the post's image, and the `@ManyToOne` decorator is used to define relationships with other entities.


### User Entity

This script is used to define the User entity. It extends the Generic entity and adds several fields. The `username`, `email`, `password`, and `salt` fields store information about the user. The `@OneToMany` decorator is used to define relationships with other entities. The `@OneToMany(() => PostEntity, (post: PostEntity) => post.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user has many posts, and that the `user` property on a `PostEntity` instance should be updated when the `user_id` property on a `UserEntity` instance is changed. The `@OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user has many comments, and that the `user` property on a `CommentEntity` instance should be updated when the `user_id` property on a `UserEntity` instance is changed. The `@OneToMany(() => LikeEntity, (like: LikeEntity) => like.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user has many likes, and that the `user` property on a `LikeEntity` instance should be updated when the `user_id` property on a `UserEntity` instance is changed. The `@OneToMany(() => UserFollowerEntity, (follower: UserFollowerEntity) => follower.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user has many followers, and that the `user` property on a `UserFollowerEntity` instance should be updated when the `user_id` property on a `UserEntity` instance is changed. The `@OneToMany(() => UserFollowerEntity, (following: UserFollowerEntity) => following.following, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })` decorator indicates that a user follows many users, and that the `following` property on a `UserFollowerEntity` instance should be updated when the `following_id` property on a `UserEntity` instance is changed.

This entity allows for the implementation of a user system where users can create, edit, and delete their own profiles. The user system is used to share information with other users, and the relationships with other entities allow for the implementation of features such as posts, comments, likes, and follower relationships. The `salt` field is used to store a random string that is used to encrypt the user's password.


## comment.subscribers.ts

This script is used to define a subscriber for the Comment entity. A subscriber is a class that listens for events on a specific entity. In this case, the subscriber is used to listen for insert events on the Comment entity.

The subscriber has one method, `afterInsert`, which is called after a new comment is inserted into the database. This method is used to update the `comments_count` field on the associated `PostEntity` instance.

This subscriber is used to keep track of the number of comments on a post. When a new comment is inserted, the subscriber is called and it updates the `comments_count` field on the associated `PostEntity` instance. This allows for the implementation of a feature where users can see how many comments are on a post.
