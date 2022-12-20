import { FeedRepository } from './../../feed/feed.repository';
import { UserDto } from 'src/modules/user/dto/user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsCreateDto } from '../dto/commnents.create.dto';
import { Comments } from '../schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly feedRepository: FeedRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(
    id: string,
    commentData: CommentsCreateDto,
    user: UserDto,
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
      const newComment = new this.commentsModel({
        author: user._id,
        contents,
        info: targetFeed._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
