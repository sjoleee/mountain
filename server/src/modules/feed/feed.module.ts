import { ChallengesModule } from './../challenges/challenges.module';
import { Feed, FeedSchema } from './schemas/feed.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { FeedService } from './services/feed.service';
import { Comments, CommentsSchema } from '../comments/schemas/comments.schema';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { AdminFeedController } from './admin.feed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feed.name, schema: FeedSchema },
      { name: Comments.name, schema: CommentsSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
    ChallengesModule,
  ],
  controllers: [FeedController, AdminFeedController],
  providers: [FeedService, FeedRepository],
  exports: [FeedService, FeedRepository],
})
export class FeedModule {}
