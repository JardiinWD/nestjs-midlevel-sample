// ====== IMPORTS ======
import { User as UserEntity, Roles as RolesEnum } from "./user.entity";
import { Post as PostEntity } from "./post.entity";
import { Generic as GenericEntity } from "./generic.entity";
import { Comment as CommentEntity } from "./comment.entity";
import { Like as LikeEntity, Type as LikeEnum } from "./like.entity";
import { UserFollower as UserFollowerEntity, Status as StatusEnum } from "./user-follower.entity";
import { File as FileEntity } from "./file.entity";

// ====== EXPORTS ======
export {
    // --> User Entity
    UserEntity,
    // --> Post Entity
    PostEntity,
    // --> Generic Entity
    GenericEntity,
    // --> Comment Entity
    CommentEntity,
    // --> Like Entity
    LikeEntity,
    // --> User Follower Entity
    UserFollowerEntity,
    // --> File Entity
    FileEntity,
    // --> ENUMS
    LikeEnum,
    StatusEnum,
    RolesEnum
}


