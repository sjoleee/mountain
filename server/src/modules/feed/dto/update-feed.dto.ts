import { PartialType } from '@nestjs/swagger';
import { FeedDto } from './feed.dto';

export class UpdateFeedDto extends PartialType(FeedDto) {}
