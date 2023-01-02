import { CommentsModule } from './../comments/comments.module';
import { ChallengesModule } from './../challenges/challenges.module';
import { FeedModule } from './../feed/feed.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [UsersModule, FeedModule, ChallengesModule, CommentsModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
