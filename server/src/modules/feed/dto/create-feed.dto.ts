import { PickType } from '@nestjs/swagger';
import { FeedDto } from './feed.dto';
export class CreateFeedDto extends PickType(FeedDto, [
  'title',
  'content',
  'tag',
  'feedImg',
] as const) {}
