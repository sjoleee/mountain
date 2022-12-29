import { ChallengesRepository } from './../challenges/challenges.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FeedRepository } from '../feed/feed.repository';
import { ResponseUsersDto } from '../users/dto/response-users.dto';
import { UsersRepository } from '../users/users.repository';
import { CommentsRepository } from '../comments/comments.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly feedRepository: FeedRepository,
    private readonly challengesRepository: ChallengesRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async findOneByUsername(username: string): Promise<ResponseUsersDto> {
    const user = await this.usersRepository.findUserByUsername(username);
    return new ResponseUsersDto(user);
  }
  async deleteById(id: string) {
    const user = await this.usersRepository.findOneUserById(id);
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: 'user 를 찾을 수 없습니다',
      });
    }
    const organizerFilter = { organizer: user._id };
    const userChallengeList = await this.challengesRepository.findAllByFilter(
      organizerFilter,
    );
    if (userChallengeList.length !== 0) {
      throw new NotFoundException({
        status: 404,
        message: '모든 챌린지를 탈퇴하고 오셔야 합니다',
      });
    }
    const userResult = await this.usersRepository.deleteOneById(id);
    if (!userResult) {
      throw new NotFoundException({
        status: 404,
        message: 'userResult 삭제에 실패했습니다',
      });
    }
    //피드제거
    const feedFilter = { author: user._id };
    const feedResult = await this.feedRepository.deleteAll(feedFilter);
    if (!feedResult) {
      throw new NotFoundException({
        status: 404,
        message: 'feedResult 삭제에 실패했습니다',
      });
    }
    //챌린지 제거
    const challengeFilter = {};
    challengeFilter['peopleList'] = { $in: [user._id] };
    const challengeList = await this.challengesRepository.findAllByFilter(
      challengeFilter,
    );
    for (const challenge of challengeList) {
      challenge.waitingList = challenge.waitingList.filter(
        (user) => !user.equals(user._id),
      );
      challenge.peopleList = challenge.peopleList.filter(
        (user) => !user.equals(user._id),
      );
      await this.challengesRepository.updateById(
        challenge._id.toString(),
        challenge,
      );
    }
    //댓글 제거
    const commentFilter = { author: user._id };
    const commentResult = await this.commentsRepository.deleteAll(
      commentFilter,
    );
    if (!commentResult) {
      throw new NotFoundException({
        status: 404,
        message: 'commentResult 삭제에 실패했습니다',
      });
    }

    const count = {
      feed: feedResult.deletedCount,
      comment: commentResult.deletedCount,
    };
    return { status: 200, message: 'success', count };
  }
}
