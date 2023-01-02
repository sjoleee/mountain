import { PickType } from '@nestjs/swagger/dist';
import { CommentsDto } from './comments.dto';

export class CommentsCreateDto extends PickType(CommentsDto, [
  'contents',
] as const) {}
