// ===== IMPORTS =========
import { Controller } from '@nestjs/common';
// ===== SERVICE =========
import { CommentsService } from '@services/index';
// ===== ENTITIES =========
import { CommentEntity } from '@entities/index';
// ===== CRUD OPERATORS =========
import { Crud } from '@dataui/crud';

@Crud({
  model: { type: CommentEntity },
})
@Controller('comments')
export class CommentsController {
  // 3. Inject the service for comments --> IT MUST BE "service" WITH CRUD Library OTHERWISE IT WILL NOT WORK
  constructor(public service: CommentsService) {}
}
