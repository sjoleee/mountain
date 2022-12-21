import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '../comments/schemas/comments.schema';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './schemas/feed.schema';
import { Users } from '../users/schemas/users.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectModel(Feed.name) private readonly feedModel: Model<Feed>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async createFeed(createFeedDto: CreateFeedDto) {
    const newFeed = await this.feedModel.create(createFeedDto);
    console.log(createFeedDto, newFeed);
    return newFeed;
  }

  async findAll() {
    const feeds = await this.feedModel
      .find()
      .populate('comments', '', this.commentsModel);
    return feeds;
  }
  async findAllWithQuery(filter) {
    const feeds = await this.feedModel
      .find(filter)
      .populate('comments', '', this.commentsModel)
      .populate('author', '', this.userModel);
    return feeds;
  }
  async findAllById(id: string) {
    const feeds = await this.feedModel.find({ author: id });
    return feeds;
  }

  async findOneById(id: string) {
    const feed = await this.feedModel
      .findOne({ _id: id })
      .populate('comments', '', this.commentsModel);
    return feed;
  }
}
