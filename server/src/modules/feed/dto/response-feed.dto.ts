import { FeedDto } from './feed.dto';
import { PickType } from '@nestjs/swagger';

export class ResponseFeedDto extends PickType(FeedDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'type',
  'tag',
  'feedImg',
  'author',
  'content',
  'likes',
  'comments',
] as const) {
  constructor(feed: FeedDto) {
    super();
    this._id = feed._id;
    this.createdAt = feed.createdAt;
    this.updatedAt = feed.updatedAt;
    this.type = feed.type;
    this.tag = feed.tag;
    this.feedImg = feed.feedImg;
    this.author = feed.author;
    this.content = feed.content;
    this.likes = feed.likes;
    this.comments = feed.comments;
  }
}
