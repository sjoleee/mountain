import { CommentsRepository } from './../comments.repository';
import { FeedRepository } from './../../feed/feed.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsCreateDto } from '../dto/commnents.create.dto';
import { Comments } from '../schemas/comments.schema';
import { UsersDto } from 'src/modules/users/dto/users.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsRepository.findAll({});
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(
    id: string,
    commentData: CommentsCreateDto,
    user: UsersDto,
  ) {
    try {
      const { contents } = commentData;
      const targetFeed = await this.feedRepository.findOneById(id);
      if (!targetFeed) {
        throw new NotFoundException({
          status: 404,
          message: '해당 feed 가 없습니다 ',
        });
      }
      const newCommentBody = {
        author: user._id,
        contents,
        info: targetFeed._id,
      };
      const result = await this.commentsRepository.create(newCommentBody);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAll(filter) {
    return await this.commentsRepository.deleteAll(filter);
  }
}
